import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Heading from '../../components/Heading';
import useValidate from '../../app/hook/useValidate';
import axios from '../api/axiosApi';
import { backendAPI } from '../../config';
import { StatusCode } from '../../util/constant';
import * as actions from '../../store/actions';
import { swtoast } from "../../mixins/swal.mixin";

const DangNhapNhaTuyenDung = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLogin = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // check email and password
        const check = useValidate([email, password]);

        if (!check) return;

        const dataBuild = {
            email,
            matKhau: password,
        };

        try {
            const Res = await axios.post(`${backendAPI}/dang-nhap/nha-tuyen-dung`, dataBuild, {});

            if (Res.status === StatusCode.validTkOrMk) {
                console.log('check lot');

                const data = {
                    role: Res.data.roles,
                    email: Res.data.email,
                    id: Res.data.id,
                    accessToken: Res.data.accessToken,
                };
                console.log(data);

                dispatch(actions.userLoginSuccess(data));
                swtoast.success({
                    text: "Đăng nhập tài khoản thành công"
                })
                Router.push('/');
            }
        } catch (error) {
            if (error && error.response && error.response.status === StatusCode.SaiTkOrMk) {
                swtoast.fire({
                    text: error.response.data.message,
                });
                return;
            }
        }
    };

    return (
        <div className="trang-dang-nhap py-4">
            <Heading tieuDe="Đăng nhập nhà tuyển dụng" />
            {!isLogin ? (
                <div className="chua-form-dang-nhap">
                    <form className="row g-3 form-dang-nhap" onSubmit={handleSubmit}>
                        <div className="col-md-12">
                            <label htmlFor="inputEmail4" className="form-label">
                                Email đăng nhập
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                id="inputEmail4"
                            />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputPassword4" className="form-label">
                                Mật khẩu
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                placeholder="Mật khẩu"
                                id="inputPassword4"
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn nut-dang-nhap w-100">
                                Đăng nhập
                            </button>
                        </div>
                        <div className="w-100 text-center">
                            <p>
                                Chưa có tài khoản?{' '}
                                <Link style={{ textDecoration: 'none' }} href="/dang-ky/nha-tuyen-dung">
                                    Đăng ký
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="py-5">
                    <p>Bạn đã đăng nhập !</p>
                </div>
            )}
        </div>
    );
};

export default DangNhapNhaTuyenDung;
