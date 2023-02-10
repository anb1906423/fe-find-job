import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../styles/dashboard.module.scss';
import EmployerList from './components/danhsachnhatuyendung/EmployerList';
import EmployerAccountList from './components/taikhoannhatuyendung/EmployerAccountList';
import ActiveLink from '../../app/@func/ActiveLink';
import MeProfile from './components/Taikhoanungvien/me';
import Route from '../../app/@func/Route';
import { Params } from '../../util/constant';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Dashboard() {
    const role = useSelector((state) => state.user.role);

    return (
        <div className={cx('dash-board-wp')}>
            <div className="px-2 overflow-hidden">
                <div className="row">
                    <div className={cx('col-3', 'left')}>
                        <div className={cx('wp-left')}>
                            {role === 0 && (
                                <>
                                    <ActiveLink
                                        activeClassName={cx('active')}
                                        href="/dashboard/danh-sach-nha-tuyen-dung"
                                    >
                                        <span>Danh Sách Nhà Tuyển Dụng</span>
                                    </ActiveLink>
                                    <ActiveLink
                                        activeClassName={cx('active')}
                                        href="/dashboard/danh-sach-tai-khoan-nha-tuyen-dung"
                                    >
                                        <span>Danh Sách Tài Khoản Ứng Viên</span>
                                    </ActiveLink>
                                </>
                            )}
                            <ActiveLink activeClassName={cx('active')} href="/dashboard/tai-khoan-cua-toi">
                                <span>Trang Cá Nhân</span>
                            </ActiveLink>
                        </div>
                    </div>
                    <div className="col-9">
                        {role === 0 && (
                            <>
                                <Route
                                    nameQueryParam="slug"
                                    path={Params.danhSachNhaTuyenDung}
                                    element={<EmployerList />}
                                />
                                <Route
                                    nameQueryParam="slug"
                                    path={Params.danhSachTaiKhoanNhaTuyenDung}
                                    element={<EmployerAccountList />}
                                />
                            </>
                        )}
                        <Route nameQueryParam="slug" path={Params.taikhoancuatoi} element={<MeProfile />} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
