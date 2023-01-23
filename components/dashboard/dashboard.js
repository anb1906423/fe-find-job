import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../styles/adminWebsite.module.scss';
import EmployerList from './components/danhsachnhatuyendung/EmployerList';
import EmployerAccountList from './components/taikhoannhatuyendung/EmployerAccountList';
import ActiveLink from '../../app/@func/ActiveLink';
import MeProfile from './components/Taikhoanungvien/me';
import Route from '../../app/@func/Route';
import { Params } from '../../util/constant';

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <div className={cx('dash-board-wp')}>
            <div className="px-2 py-4 overflow-hidden">
                <div className="row">
                    <div className="col-3">
                        <div className={cx('wp-left')}>
                            <ActiveLink activeClassName={cx('active')} href="/dashboard/danh-sach-nha-tuyen-dung">
                                <span>List Employer</span>
                            </ActiveLink>
                            <ActiveLink
                                activeClassName={cx('active')}
                                href="/dashboard/danh-sach-tai-khoan-nha-tuyen-dung"
                            >
                                <span>List Account Employer</span>
                            </ActiveLink>
                            <ActiveLink activeClassName={cx('active')} href="/dashboard/tai-khoan-cua-toi">
                                <span>Profile</span>
                            </ActiveLink>
                        </div>
                    </div>
                    <div className="col-9">
                        <Route nameQueryParam="slug" path={Params.danhSachNhaTuyenDung} element={<EmployerList />} />
                        <Route
                            nameQueryParam="slug"
                            path={Params.danhSachTaiKhoanNhaTuyenDung}
                            element={<EmployerAccountList />}
                        />
                        <Route nameQueryParam="slug" path={Params.taikhoancuatoi} element={<MeProfile />} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
