import React from 'react';
import Heading from '../../components/Heading';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import axios from '../api/axiosApi';
import useValidate from '../../app/hook/useValidate';
import { backendAPI } from '../../config';
import { StatusCode } from '../../util/constant';
import * as actions from '../../store/actions';

const DangNhapUngVien = () => {
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

        // pending api

        try {
            const Res = await axios.post(`${backendAPI}/dang-nhap/ung-vien`, dataBuild, {});

            if (Res.status === StatusCode.validTkOrMk) {
                const data = {
                    role: Res.data.roles,
                    email: Res.data.email,
                    id: Res.data.id,
                    accessToken: Res.data.accessToken,
                };

                dispatch(actions.userLoginSuccess(data));

                Router.push('/');
            }
        } catch (error) {
            if (error && error.response && error.response.status === StatusCode.SaiTkOrMk) {
                alert(error.response.data.message);
                return;
            }
        }
    };

    return (
        <div className="trang-dang-nhap pt-3 pb-5">
            <Heading tieuDe="Đăng nhập ứng viên" />
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
                                <Link style={{ textDecoration: 'none' }} href="/dang-ky/ung-vien">
                                    Đăng ký
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <p className="text-center py-5">
                        <span>Bạn đã đăng nhập thành công!</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default DangNhapUngVien;
