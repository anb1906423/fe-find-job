import React, { useEffect, useState } from 'react';
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

    const userInfo = useSelector((state) => state.user.userInfo);
    const id = userInfo ? userInfo.id : null;

    return (
        <div className={cx('dash-board-wp')}>
            <div className="px-2 overflow-hidden">
                <div className="row">
                    <div className={cx('col-3', 'left')}>
                        <div className={cx('wp-left')}>
                            <ActiveLink activeClassName={cx('active')} href="/dashboard/tai-khoan-cua-toi">
                                <span>Thông Tin Cá Nhân</span>
                            </ActiveLink>
                            {role === -1 && (
                                <>
                                    <ActiveLink
                                        activeClassName={cx('active')}
                                        href="/manage-apply/view-all-apply?isView=true"
                                    >
                                        <span>Việc Làm Đã Ứng Tuyển</span>
                                    </ActiveLink>
                                    <ActiveLink
                                        activeClassName={cx('active')}
                                        href="/wrong-change-pass"
                                    >
                                        <span>Đổi Mật Khẩu</span>
                                    </ActiveLink>
                                </>
                            )}
                            {role === 0 && (
                                <>
                                    <ActiveLink
                                        activeClassName={cx('active')}
                                        href={`/chi-tiet/${id}`}
                                    >
                                        <span>Thông Tin Công Ty</span>
                                    </ActiveLink>
                                    <ActiveLink
                                        activeClassName={cx('active')}
                                        href="/post"
                                    >
                                        <span>Đăng Tin Tuyển Dụng</span>
                                    </ActiveLink>
                                    <ActiveLink
                                        activeClassName={cx('active')}
                                        href="/post/quan-li-bai-viet"
                                    >
                                        <span>Quản Lý Tin</span>
                                    </ActiveLink>
                                    <ActiveLink
                                        activeClassName={cx('active')}
                                        href="/manage-apply/view-all-dashboard?isAll=true"
                                    >
                                        <span>Danh Sách Ứng Viên</span>
                                    </ActiveLink>
                                    <ActiveLink
                                        activeClassName={cx('active')}
                                        href="/wrong-change-pass"
                                    >
                                        <span>Đổi Mật Khẩu</span>
                                    </ActiveLink>
                                    {/* <ActiveLink
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
                                    </ActiveLink> */}
                                </>
                            )}
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
