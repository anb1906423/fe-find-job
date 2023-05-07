import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

import Header from './Header';
import Footer from './Footer';
import { swtoast } from '../mixins/swal.mixin';
import { StatusCode } from '../util/constant';
import { backendAPI } from '../config';
import axios from 'axios';
import * as actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.user.isLoggedIn);

    useGoogleOneTapLogin({
        onSuccess(res) {
            console.log(res);

            const dataBuildFireBase = {
                name: res?.name,
                email: res?.email,
                avatar: res.picture || '',
                matKhau: '12345678',
                soDienThoai: res?.phoneNumber,
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
                    if (error && error.response && error.response.status === StatusCode.SaiTkOrMk) {
                        swtoast.fire({
                            text: error.response.data.message,
                        });
                        return;
                    }
                }
            };

            handleSaveUser();
        },

        onError(error) {
            console.log(error);
        },
        googleAccountConfigs: {
            client_id: '755648065622-1ojcq32mdcsls91tp86q4h6kuod74g0c.apps.googleusercontent.com',
        },
    });

    const params = useRouter();

    console.log(params.asPath);

    return (
        <>
            {params?.asPath === '/create-cv' ? (
                <div className="cont">{children}</div>
            ) : (
                <GoogleOAuthProvider clientId="755648065622-1ojcq32mdcsls91tp86q4h6kuod74g0c.apps.googleusercontent.com">
                    <div>
                        <Header />
                        <div className="cont">{children}</div>
                        <Footer />
                    </div>
                </GoogleOAuthProvider>
            )}
        </>
    );
};

export default Layout;
