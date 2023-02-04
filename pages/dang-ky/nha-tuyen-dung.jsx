import React, { useState, useEffect, useRef } from 'react';
import Heading from '../../components/Heading';
import Link from 'next/link';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { swtoast } from '../../mixins/swal.mixin';
import { UploadImage } from '../../services/siteServices'

import { REACT_APP_UPLOAD_PRESET, backendAPI } from '../../config';

const LOGIN_URL = backendAPI + '/dang-ky/nha-tuyen-dung';
const PHONENUMBER_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PWD_REGEX = /^[a-zA-Z0-9]+$/;

const DangKyNhaTuyenDung = () => {
    const isLogin = useSelector((state) => state.user.isLoggedIn);

    const emailRef = useRef();
    const tenCtyRef = useRef();
    const matKhauRef = useRef();
    const soDienThoaiRef = useRef();
    const maSoThueRef = useRef();
    const diaChiRef = useRef();

    const [email, setEmail] = useState('');
    const [tenCty, setTenCty] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [maSoThue, setMaSoThue] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [logoCty, setLogoCty] = useState('');
    const [err, setErr] = useState('');

    useEffect(() => {
        if (isLogin) return;

        emailRef.current.focus();
    }, []);

    const xuLyDangNhap = async (e) => {
        e.preventDefault();
        if (!EMAIL_REGEX.test(email)) {
            emailRef.current.focus();
            setErr('Địa chỉ email không hợp lệ!');
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
        if (tenCty.length == 0) {
            tenCtyRef.current.focus()
            setErr('Tên công ty không được để trống!');
            return
        }
        if (diaChi.length == 0) {
            diaChiRef.current.focus()
            setErr('Địa chỉ liên hệ không được để trống!');
            return
        }
        if (!PHONENUMBER_REGEX.test(soDienThoai) && soDienThoai.length != 0 || soDienThoai.length === 0) {
            soDienThoaiRef.current.focus();
            setErr('Số điện thoại không hợp lệ!');
            return;
        }
        if (maSoThue.length == 0) {
            maSoThueRef.current.focus()
            setErr('Mã số thuế không được để trống!');
            return
        }

        const ResImg = await UploadImage({
            file: logoCty,
            upload_preset: REACT_APP_UPLOAD_PRESET,
        });

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ logoCty: ResImg.data.url, tenCty, email, matKhau, soDienThoai, diaChi, maSoThue }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            );
            swtoast.success({
                text: 'Đăng ký tài khoản thành công!',
            });
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            console.log(accessToken);
            // console.log(roles);
            // setCookie('user', response.data);

            Router.push('/dang-nhap/nha-tuyen-dung');

            console.log(response.data);
            // window.location.assign('/admin/tat-ca-xe')
            // setAuth({ email, pwd, roles, accessToken });
            setEmail('');
            setMatKhau('');
            setErr('');
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErr('No server response!');
            } else if (err.response.status === 400) {
                setErr('Thông tin chứa dấu * là bắt buộc!');
            } else if (err.response.status === 401) {
                setErr('Email or password is incorrect!');
            } else if (err.response.status === 422) {
                setErr('Địa chỉ email đã được sử dụng!')
            } else {
                setErr('Login falled');
            }
        }
    };

    return (
        <div className="trang-dang-ky-nha-tuyen-dung">
            {!isLogin ? (
                <>
                    <Heading tieuDe="Đăng ký nhà tuyển dụng" />
                    <div className="chua-form-dang-ky">
                        <form className="row g-3 form-dang-ky" onSubmit={xuLyDangNhap}>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={matKhau}
                                    ref={matKhauRef}
                                    onChange={(e) => setMatKhau(e.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">
                                    Tên công ty *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                    placeholder="Họ và tên (Bắt buộc)"
                                    value={tenCty}
                                    ref={tenCtyRef}
                                    onChange={(e) => setTenCty(e.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress2" className="form-label">
                                    Địa chỉ liên hệ *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress2"
                                    placeholder="Địa chỉ (Bắt buộc)"
                                    value={diaChi}
                                    ref={diaChiRef}
                                    onChange={(e) => setDiaChi(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">
                                    Số điện thoại liên hệ *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Số điện thoại (Bắt buộc)"
                                    className="form-control"
                                    id="inputCity"
                                    ref={soDienThoaiRef}
                                    value={soDienThoai}
                                    onChange={(e) => setSoDienThoai(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputZip" className="form-label">
                                    Mã số thuế *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Mã số thuế (Bắt buộc)"
                                    className="form-control"
                                    id="inputZip"
                                    value={maSoThue}
                                    ref={maSoThueRef}
                                    onChange={(e) => setMaSoThue(e.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label" htmlFor="gridCheck">
                                    Logo công ty
                                </label>
                                <div className="input-group">
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="inputGroupFile04"
                                        aria-describedby="inputGroupFileAddon04"
                                        aria-label="Upload"
                                        onChange={(e) => setLogoCty(e.target.files[0])}
                                    />
                                </div>
                            </div>
                            <div>
                                <p
                                    className='text-danger'
                                    style={{
                                        margin: "0"
                                    }}
                                >{err}</p>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn nut-dang-ky w-100">
                                    Đăng ký
                                </button>
                            </div>
                            <div className="w-100 text-center">
                                <p>
                                    Đã có tài khoản?{' '}
                                    <Link style={{ textDecoration: 'none' }} href="/dang-nhap/nha-tuyen-dung">
                                        Đăng nhập
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <div className="d-flex justify-content-center align-items-center p-4 h-500px">
                    <span>Bạn đã đăng nhập thành công</span>
                </div>
            )}
        </div>
    );
};

export default DangKyNhaTuyenDung;
