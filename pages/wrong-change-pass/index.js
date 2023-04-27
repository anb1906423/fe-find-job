import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Router from 'next/router';

import useGetRoleUser from '../../app/hook/useGetRoleUser/useGetRoleUser';
import { roleUser } from '../../util/constant';
import { DoiMatKhauNhaTuyenDung, DoiMatKhauUngVien } from '../../services/siteServices';
import Heading from '../../components/Heading';
import {
    EyeOutlined,
    EyeInvisibleOutlined
} from '@ant-design/icons'

export default function WrongChangePass() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isViewPass, setIsViewPass] = useState(false);

    const userInfo = useGetRoleUser();

    useEffect(() => {
        const roleUserCheck = userInfo?.id;

        console.log(roleUserCheck !== roleUser.NhaTuyenDung, roleUserCheck, roleUser.NhaTuyenDung, 0 !== 0);

        if (!roleUserCheck) {
            Router.push('/404-not-found');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu hiện tại và mật khẩu mới có giống nhau không
        if (newPassword !== confirmPassword || currentPassword.length < 8 || newPassword.length < 8) {
            alert('Mật khẩu mới và xác nhận mật khẩu phải giống nhau hoặc là mật độ dài chưa đủ 8 ký tự.');
            return;
        }

        // Xử lý gửi yêu cầu thay đổi mật khẩu tới máy chủ ở đây

        const role = userInfo?.role;
        const idUser = userInfo?.id;

        if (idUser) {
            const dataBuild = {
                id: idUser,
                matKhauCu: currentPassword,
                matKhauMoi: newPassword,
            };

            try {
                if (role && role === roleUser.UngVien) {
                    const ResUngVienChangePass = await DoiMatKhauUngVien(idUser, dataBuild);

                    if (ResUngVienChangePass) {
                        alert(ResUngVienChangePass?.data?.message);
                    }
                } else {
                    const ResNhaTuyenDungChangePass = await DoiMatKhauNhaTuyenDung(idUser, dataBuild);

                    if (ResNhaTuyenDungChangePass) {
                        alert(ResNhaTuyenDungChangePass?.data?.message);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        // Reset form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <Container>
            <Row>
                <div className="py-2">
                    <Heading tieuDe="Đổi mật khẩu" />
                    <Col sm={4} style={{ margin: "0 auto" }}>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="form-group mb-3">
                                <label className="mb-2" htmlFor="current-password">
                                    Mật khẩu hiện tại:
                                </label>
                                <input
                                    id="current-password"
                                    type={isViewPass ? 'text' : 'password'}
                                    className="form-control"
                                    value={currentPassword}
                                    onChange={(event) => setCurrentPassword(event.target.value)}
                                    placeholder="Mật khẩu hiện tại"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="mb-2" htmlFor="new-password">
                                    Mật khẩu mới:
                                </label>
                                <input
                                    id="new-password"
                                    type={isViewPass ? 'text' : 'password'}
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    placeholder="Mật khẩu mới"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="mb-2" htmlFor="confirm-password">
                                    Xác nhận mật khẩu:
                                </label>
                                <input
                                    id="confirm-password"
                                    type={isViewPass ? 'text' : 'password'}
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    placeholder="Xác nhận mật khẩu mới"
                                />
                                <div className="">
                                    <Row>
                                        <Col sm={10}>
                                            <button
                                                type="submit"
                                                style={{
                                                    height: "36px"
                                                }}
                                                className="w-100 btn btn-dark mt-3 d-flex align-items-center justify-content-center"
                                            >
                                                Xác nhận
                                            </button>
                                        </Col>
                                        <Col sm={2}>
                                            <button
                                                style={{
                                                    height: "36px"
                                                }}
                                                type="button"
                                                onClick={() => setIsViewPass(!isViewPass)}
                                                className="w-100 btn btn-success mt-3 d-flex align-items-center justify-content-center"
                                            >
                                                {isViewPass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </form>
                    </Col>
                </div>
            </Row>
        </Container>
    );
}

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}
