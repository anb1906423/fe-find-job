import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

import { swtoast } from '../../mixins/swal.mixin';
import { StatusCode } from '../../util/constant';
import { backendAPI } from '../../config';
import { useRouter } from 'next/router';

import Header from '../Header';
import Footer from '../Footer';

import axios from 'axios';
import * as actions from '../../store/actions';
import { useDispatch } from 'react-redux';

export function LayOutNotLogin({ children }) {
    const dispatch = useDispatch();
    const params = useRouter();

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
}

export function LayOuLogin({ children }) {
    const params = useRouter();

    return (
        <>
            {params?.asPath === '/create-cv' ? (
                <div className="cont">{children}</div>
            ) : (
                <div>
                    <Header />
                    <div className="cont">{children}</div>
                    <Footer />
                </div>
            )}
        </>
    );
}
