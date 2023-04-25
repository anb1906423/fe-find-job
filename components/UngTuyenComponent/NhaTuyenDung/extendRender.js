import React from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';

import style from '../ungtuyen.module.scss';
const cx = classNames.bind(style);

export default function ExtendRender({ dataNTD, isButton = true }) {
    return (
        <div className={cx('congty')}>
            <div
                style={{
                    backgroundImage: `url(${
                        dataNTD?.banner
                            ? dataNTD?.banner
                            : 'https://lambanner.com/wp-content/uploads/2021/03/MNT-DESIGN-TOP-KICH-THUOC-BANNER-QUANG-CAO-GOOGLE-2021-1130x570.jpg'
                    })`,
                }}
                className={cx('banner')}
            ></div>
            <div
                className={cx('avatar')}
                style={{
                    backgroundImage: `url(${dataNTD?.anhCongTy ? dataNTD?.anhCongTy : '../img/no-avatar.jpg'})`,
                }}
            ></div>
            {isButton && (
                <p className={cx('navigate-ntd')}>
                    <button className="btn btn-primary">
                        <Link href="/dashboard/tai-khoan-cua-toi">Sửa thông tin</Link>
                    </button>
                    <button className="btn btn-success">
                        <Link href="/post">Đăng tin tuyển dụng</Link>
                    </button>
                    <button className="btn btn-warning">
                        <Link href="/post/quan-li-bai-viet">Quản lí bài đăng</Link>
                    </button>
                </p>
            )}
        </div>
    );
}
