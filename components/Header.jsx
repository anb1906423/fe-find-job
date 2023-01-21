import React from 'react';
import Link from 'next/link';
import SelectItem from './SelectItem';
import Swal from 'sweetalert2';
import { provinces } from '../data/data';
import { FaSearch, FaUserPlus } from 'react-icons/fa';

const menu = [
    {
        title: 'Ứng viên',
        href: '/ung-vien',
    },
    {
        title: 'Việc mới nhất',
        href: 'viec-moi-nhat',
    },
    {
        title: 'Liên hệ',
        href: 'lien-he',
    },
];

const Header = () => {
    const taiKhoan = [
        {
            title: 'Đăng ký',
            function: () => {
                Swal.fire({
                    title: 'Chọn loại tài khoản',
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Font_Awesome_5_solid_user-plus.svg',
                    imageWidth: 100,
                    imageHeight: 96,
                    imageAlt: 'Custom image',
                    showDenyButton: true,
                    showCancelButton: false,
                    showCloseButton: true,
                    confirmButtonText: 'Ứng viên',
                    denyButtonText: 'Nhà tuyển dụng',
                    customClass: {
                        actions: 'my-actions',
                        cancelButton: 'order-1 right-gap',
                        confirmButton: 'order-2',
                        denyButton: 'order-3',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.assign('/dang-ky/ung-vien');
                    } else if (result.isDenied) {
                        window.location.assign('/dang-ky/nha-tuyen-dung');
                    }
                });
            },
            href: '#',
        },
        {
            title: 'Đăng nhập',
            function: () => {
                Swal.fire({
                    imageUrl:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Font_Awesome_5_solid_user-check.svg/768px-Font_Awesome_5_solid_user-check.svg.png?20180810222541',
                    imageWidth: 100,
                    imageHeight: 96,
                    imageAlt: 'Custom image',
                    title: 'Chọn loại tài khoản',
                    showDenyButton: true,
                    showCancelButton: false,
                    showCloseButton: true,
                    confirmButtonText: 'Ứng viên',
                    denyButtonText: 'Nhà tuyển dụng',
                    customClass: {
                        actions: 'my-actions',
                        cancelButton: 'order-1 right-gap',
                        confirmButton: 'order-2',
                        denyButton: 'order-3',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.assign('/dang-nhap/ung-vien');
                    } else if (result.isDenied) {
                        window.location.assign('/dang-nhap/nha-tuyen-dung');
                    }
                });
            },
            href: '#',
        },
    ];

    return (
        <div className="header-wrapper">
            <div className="header w-100 d-flex align-items-center">
                <div className="logo-box p-2">
                    <Link href="/">
                        <img className="logo" src="../img/logo.png" alt="" />
                    </Link>
                </div>
                <ul className="menu p-2">
                    {menu.map((item, index) => {
                        return (
                            <li className="menu-item fw-bold text-uppercase" key={index}>
                                <Link href={item.href}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>

                <ul className="tai-khoan p-2 ms-auto">
                    {taiKhoan.map((item, index) => {
                        return (
                            <li
                                onClick={item.function}
                                className="tai-khoan-item menu-item fw-bold text-uppercase"
                                key={index}
                            >
                                <a href={item.href}>{item.title}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="sub-header d-flex align-items-center justify-content-end">
                <form action="" className="filter-job d-flex align-items-center justify-content-around">
                    <div className="div-on-form input-search-box">
                        <label htmlFor=""></label>
                        <input placeholder="-- Tất cả ngành nghề --" type="text" />
                    </div>
                    <div className="div-on-form">
                        <SelectItem list={provinces} />
                    </div>
                    <div className="div-on-form">
                        <button className="tim-kiem d-flex align-items-center">
                            <FaSearch />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Header;
