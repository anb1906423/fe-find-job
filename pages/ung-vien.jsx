import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { swtoast } from '../mixins/swal.mixin';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import { backendAPI } from '../config';
import Heading from '../components/Heading';
import axios from './api/axios';
import * as actions from '../store/actions';

const PHONENUMBER_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PWD_REGEX = /^[a-zA-Z0-9]+$/;

const DangKyUngVien = () => {
    const isLogin = useSelector((state) => state.user.isLoggedIn);

    const hoVaTenRef = useRef();
    const dispatch = useDispatch();

    const emailRef = useRef();
    const matKhauRef = useRef();
    const diaChiRef = useRef();
    const soDienThoaiRef = useRef();
    const sinhNhatRef = useRef();

    const [hoVaTen, setHoVaTen] = useState('');
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [sinhNhat, setSinhNhat] = useState('');
    const [isMale, setIsMale] = useState();

    const [err, setErr] = useState('');

    useEffect(() => {
        if (isLogin) return;

        emailRef.current.focus();
    }, []);

    const xuLyDangKy = async (e) => {
        e.preventDefault();

        if (!EMAIL_REGEX.test(email)) {
            emailRef.current.focus();
            setErr('Địa chỉ email không hợp lệ hoặc đã được sử dụng!');
            return;
        }
        if (!PWD_REGEX.test(matKhau)) {
            matKhauRef.current.focus();
            setErr('Mật khẩu không hợp lệ!');
            return;
        }
        if (matKhau.length < 8) {
            matKhauRef.current.focus();
            setErr('Mật khẩu phải ít nhất 8 ký tự!');
            return;
        }
        if (!PHONENUMBER_REGEX.test(soDienThoai) && soDienThoai.length != 0) {
            soDienThoaiRef.current.focus();
            setErr('Số điện thoại không hợp lệ!');
            return;
        }
        try {
            var response = await axios.post(
                backendAPI + '/dang-ky/ung-vien',
                JSON.stringify({ hoVaTen, soDienThoai, isMale, email, matKhau, sinhNhat, diaChi }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            );
            swtoast.success({
                text: 'Đăng ký tài khoản thành công.',
            });

            Router.push('/dang-nhap/ung-vien');

            // dispatch(
            //     actions.userLoginSuccess({
            //         role: -1,
            //         name: hoVaTen,
            //         phone: soDienThoai,
            //     }),
            // );

            console.log(JSON.stringify(response?.data));
            console.log(response?.data);
            console.log(JSON.stringify(response));
        } catch (err) {
            if (!err?.response) {
                setErr('No Server Response!');
            } else if (err.response?.status === 400) {
                setErr('Họ và tên không được để trống!');
            } else if (err.response?.status === 401) {
                setErr('Unauthorized');
            } else if (err.response?.status === 422) {
                setErr('Địa chỉ email đã được sử dụng!');
            } else {
                setErr('Register fail!');
            }
            console.log(err);
        }
    };

    return (
        <div className="trang-dang-ky-ung-vien">
            {!isLogin ? (
                <>
                    <Head>
                        <title>Đăng ký ứng viên</title>
                    </Head>
                    <Heading tieuDe="Đăng ký ứng viên" />
                    <div className="chua-form-dang-ky">
                        <form className="row g-3 form-dang-ky" onSubmit={xuLyDangKy}>
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">
                                    Email đăng nhập *
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email (Bắt buộc)"
                                    id="inputEmail4"
                                    ref={emailRef}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">
                                    Mật khẩu *
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mật khẩu (Bắt buộc)"
                                    id="inputPassword4"
                                    onChange={(e) => setMatKhau(e.target.value)}
                                    ref={matKhauRef}
                                    value={matKhau}
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">
                                    Họ và tên *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                    placeholder="Họ và tên (Bắt buộc)"
                                    onChange={(e) => setHoVaTen(e.target.value)}
                                    value={hoVaTen}
                                    ref={hoVaTenRef}
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress2" className="form-label">
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress2"
                                    placeholder="Địa chỉ"
                                    onChange={(e) => setDiaChi(e.target.value)}
                                    value={diaChi}
                                    ref={diaChiRef}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    className="form-control"
                                    id="inputCity"
                                    value={soDienThoai}
                                    ref={soDienThoaiRef}
                                    onChange={(e) => setSoDienThoai(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputZip" className="form-label">
                                    Ngày sinh
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="inputZip"
                                    value={sinhNhat}
                                    ref={sinhNhatRef}
                                    onChange={(e) => setSinhNhat(e.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label" htmlFor="gridCheck">
                                    Giới tính
                                </label>
                                <div className="form-check">
                                    <div className="d-inline-block col-4">
                                        <label htmlFor="male" className="form-label">
                                            Nam
                                        </label>
                                        <input
                                            name="sex"
                                            className="form-check-input"
                                            type="radio"
                                            id="male"
                                            value={isMale}
                                            onChange={(e) => setIsMale(true)}
                                        />
                                    </div>
                                    <div className="d-inline-block col-4">
                                        <label htmlFor="female" className="form-label">
                                            Nữ
                                        </label>
                                        <input
                                            name="sex"
                                            className="form-check-input"
                                            type="radio"
                                            id="female"
                                            value={isMale}
                                            onChange={(e) => setIsMale(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p
                                    style={{
                                        margin: '0',
                                    }}
                                    className="text-danger"
                                >
                                    {err}
                                </p>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn nut-dang-ky w-100">
                                    Đăng ký
                                </button>
                            </div>
                            <div className="w-100 text-center">
                                <p>
                                    Đã có tài khoản?{' '}
                                    <Link style={{ textDecoration: 'none' }} href="/dang-nhap/ung-vien">
                                        Đăng nhập
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div className="d-flex justify-content-center align-items-center p-4 h-500px">
                        <span>Bạn đã đăng nhập thành công</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default DangKyUngVien;
