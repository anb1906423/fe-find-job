import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import Router from 'next/router';

import styles from '../../../styles/hotro.module.scss';
import Loading from '../../../app/components/loading/loading';
import useValidate from '../../../app/hook/useValidate';
import axios from '../../api/axiosApi';
import { roleUser } from '../../../util/constant';
import { backendAPI } from '../../../config';

const cx = classNames.bind(styles);

function Support() {
    const [roleUserSelect, datRoleUser] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isViewPass, setIsViewPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeViewPassword = (e) => {
        setIsViewPass(e.target.checked);
    };

    console.log(roleUserSelect);

    const handleSubmit = async () => {
        if (!roleUserSelect && roleUserSelect !== 0) {
            alert('Bạn vui lòng chọn loại tài khoản !');
            return;
        }

        // validate email password and new password
        const check = useValidate([email, password, newPassword, confirmPassword]);

        if (!check) return;

        if (newPassword !== confirmPassword) {
            alert('Mật khẩu mới khác với mật khẩu confirm !');
            return;
        }

        // ES6 +
        const dataBuild = {
            email,
            matKhauCu: password,
            matKhauMoi: newPassword,
        };

        try {
            setIsLoading(true);

            const Res = await axios.put(
                `${backendAPI}/${
                    roleUserSelect === roleUser.UngVien ? 'ung-vien' : 'nha-tuyen-dung'
                }/doi-mat-khau/changepass`,
                dataBuild,
            );

            setIsLoading(false);

            setEmail('');
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setIsViewPass(false);
            datRoleUser(null);

            alert('Bạn đã thay đổi mật khẩu thành công !');

            Router.push('');
        } catch (error) {
            alert(error.response.data.message);
            setIsLoading(false);
            return;
        }
    };

    return (
        <div className={cx('ho-tro-wp')}>
            {isLoading && <Loading title="Đang thực hiện hành động của bạn!" />}
            <div className="container">
                <h4 className="text-center py-4">
                    <span>Thay đổi mật khẩu tài khoản của bạn!</span>
                </h4>
                <div className="mt-3 pb-4">
                    <Row>
                        <Col className="mb-4" sm={12}>
                            <label className={cx('label')}>Để đổi mật khẩu trước hết bạn hãy chọn :</label>
                            <select
                                onChange={(e) => datRoleUser(+e.target.value)}
                                className={cx('text-center', 'select')}
                            >
                                <option value={null}>Chọn tài khoản</option>
                                <option value="-1">Bạn là ứng viên</option>
                                <option value="0">Bạn là nhà tuyển dụng</option>
                                <option value="1">Bạn là nhà admin</option>
                            </select>
                        </Col>
                        <Col className="mb-3" sm={6}>
                            <label htmlFor="email" className={cx('label')}>
                                Email của bạn :
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                placeholder="nguoitruycap@gmail.com"
                                type="email"
                                className="form-control"
                            />
                        </Col>
                        <Col className="mb-3" sm={6}>
                            <label htmlFor="password-prev" className={cx('label')}>
                                Mật khẩu cũ của bạn :
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="mat khau cu cua ban..."
                                type={`${isViewPass ? 'text' : 'password'}`}
                                className="form-control"
                                id="password-prev"
                            />
                        </Col>
                        <Col className="mb-3" sm={6}>
                            <label htmlFor="new-password" className={cx('label')}>
                                Mật khẩu mới của bạn :
                            </label>
                            <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="mat khau moi cua ban..."
                                type={`${isViewPass ? 'text' : 'password'}`}
                                className="form-control"
                                id="new-password"
                            />
                        </Col>
                        <Col className="mb-3" sm={6}>
                            <label htmlFor="confirm-password" className={cx('label')}>
                                Nhập lại mật khẩu mới của bạn :
                            </label>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="nhap lai mat khau moi cua ban..."
                                type={`${isViewPass ? 'text' : 'password'}`}
                                className="form-control"
                                id="confirm-password"
                            />
                            <p className={cx('view-pass')}>
                                <input
                                    id="view-pass"
                                    value={isViewPass}
                                    type="checkbox"
                                    onChange={handleChangeViewPassword}
                                />
                                <span className="mx-1">
                                    <label htmlFor="view-pass">Hiển thị mật khẩu</label>
                                </span>
                            </p>
                        </Col>
                        <Col className="mb-3 mt-3" sm={12}>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                <span>Xác nhận đổi mật khẩu</span>
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Support;
