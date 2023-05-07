import React, { useEffect } from 'react';
import Heading from '../../components/Heading';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { swalert, swtoast } from '../../mixins/swal.mixin';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import axios from '../api/axiosApi';
import useValidate from '../../app/hook/useValidate';
import { backendAPI } from '../../config';
import { StatusCode } from '../../util/constant';
import * as actions from '../../store/actions';
import authFireBaseConfig from './Firebase/auth';

const DangNhapUngVien = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLogin = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    const provider = authFireBaseConfig();

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
                    isLoginFireBase: Res.data.isLoginFireBase,
                };

                dispatch(actions.userLoginSuccess(data));
                swtoast.success({
                    text: 'Đăng nhập tài khoản thành công',
                });
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

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                return;
            } else {
                const dataBuildFireBase = {
                    name: user?.displayName,
                    email: user?.email,
                    avatar: user.photoURL || '',
                    matKhau: '12345678',
                    soDienThoai: user?.phoneNumber,
                    isLoginFireBase: true,
                };

                const handleSaveUser = async () => {
                    try {
                        const ResLoginFireBase = await axios.post(
                            `${backendAPI}/dang-nhap/ung-vien`,
                            dataBuildFireBase,
                            {},
                        );

                        if (ResLoginFireBase.status === StatusCode.validTkOrMk) {
                            const data = {
                                role: ResLoginFireBase.data.roles,
                                email: ResLoginFireBase.data.email,
                                id: ResLoginFireBase.data.id,
                                accessToken: ResLoginFireBase.data.accessToken,
                                isLoginFireBase: ResLoginFireBase.data.isLoginFireBase,
                            };
                            console.log(data);

                            dispatch(actions.userLoginSuccess(data));
                            swtoast.success({
                                text: 'Đăng nhập tài khoản thành công',
                            });
                            Router.push('/dashboard/tai-khoan-cua-toi');
                        }
                    } catch (error) {
                        firebase.auth().signOut();
                        if (error && error.response && error.response.status === StatusCode.SaiTkOrMk) {
                            swtoast.fire({
                                text: error.response.data.message,
                            });
                            return;
                        }
                    }
                };

                handleSaveUser();
            }
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

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
                        <div className="col-12 my-3 login-or-google">
                            <label>
                                <span>or</span>
                            </label>
                            <div className="d-flex justify-content-center align-items-center">
                                <button
                                    type="button"
                                    className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"
                                    style={{
                                        backgroundColor: '#fff',
                                    }}
                                    onClick={() => {
                                        firebase.auth().signInWithPopup(provider);
                                    }}
                                >
                                    <span className="firebaseui-idp-icon-wrapper">
                                        <img
                                            className="firebaseui-idp-icon"
                                            alt=""
                                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                        />
                                    </span>
                                    <span className="firebaseui-idp-text firebaseui-idp-text-long">
                                        Sign in with Google
                                    </span>
                                </button>
                            </div>
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
                        <span>Bạn đã đăng nhập!</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default DangNhapUngVien;
