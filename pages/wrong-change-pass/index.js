import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Router from 'next/router';

import useGetRoleUser from '../../app/hook/useGetRoleUser/useGetRoleUser';
import { roleUser } from '../../util/constant';
import { DoiMatKhauNhaTuyenDung, DoiMatKhauUngVien } from '../../services/siteServices';

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
            <div className="py-4">
                <h4 className="text-center my-3 pb-0">Thay đổi mật khẩu của bạn</h4>
                <form onSubmit={handleSubmit} className="mt-3">
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
                            placeholder="nhập mật khẩu của bạn hiện tại"
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
                            placeholder="nhập mật khẩu mới của bạn"
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
                            placeholder="nhập lại mật khẩu mới của bạn"
                        />
                        <button
                            type="button"
                            onClick={() => setIsViewPass(!isViewPass)}
                            className=" px-4 btn btn-success mt-2 ms-auto d-block"
                        >
                            {isViewPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 ms-auto d-block">
                        Thay đổi mật khẩu
                    </button>
                </form>
            </div>
        </Container>
    );
}

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}
