import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import Tippy from '@tippyjs/react';

import SelectItem from './SelectItem';
import Swal from 'sweetalert2';
import { swalert } from '../mixins/swal.mixin';
import { Menu, provinces } from '../data/data';
import LazyImg from '../app/components/LazyImg';
import Button from '../app/components/Button';
import TippyRender from '../app/components/TippyRender/TippyRender';
import * as actions from '../store/actions';

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

    const Login = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const role = useSelector((state) => state.user.role);

    const [isLogin, setIsLogin] = useState(Login);

    useEffect(() => {
        setIsLogin(Login);
    }, [Login]);

    function handleMenuChange(menuItem) {
        console.log(menuItem);
    }

    // xử lí logout
    const handleLogOut = () => {
        swalert
            .fire({
                title: 'Đăng xuất',
                icon: 'warning',
                text: 'Bạn chắc chắn muốn đăng xuất?',
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    window.location.assign('/');
                    dispatch(actions.userLogOut());
                }
            });
    };

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
                    {!isLogin ? (
                        taiKhoan.map((item, index) => {
                            return (
                                <li
                                    onClick={item.function}
                                    className="tai-khoan-item menu-item fw-bold text-uppercase"
                                    key={index}
                                >
                                    <a href={item.href}>{item.title}</a>
                                </li>
                            );
                        })
                    ) : (
                        <>
                            <TippyRender
                                items={
                                    isLogin && role !== 0
                                        ? Menu
                                        : [
                                              ...Menu,
                                              {
                                                  title: 'Tạo bài đăng tuyển dụng',
                                                  icon: <i className="bi bi-file-earmark-pdf"></i>,
                                                  to: '/post',
                                              },
                                              {
                                                  title: 'Quản lí bài đăng',
                                                  icon: <i className="bi bi-card-checklist"></i>,
                                                  to: '/post/quan-li-bai-viet',
                                              },
                                          ]
                                }
                                onChange={handleMenuChange}
                            >
                                {isLogin && (
                                    <li className="mx-1">
                                        <LazyImg
                                            className="user-img"
                                            link="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png"
                                            alt="Hình ảnh đại diện người dùng"
                                        />
                                    </li>
                                )}
                            </TippyRender>
                            <Tippy content="Đăng xuất tài khoản">
                                <li className="mx-1" onClick={handleLogOut}>
                                    <Button className="btn-logout" custom="span-custom">
                                        <i className="bi bi-arrow-bar-right mx-1"></i> Đăng xuất
                                    </Button>
                                </li>
                            </Tippy>
                        </>
                    )}
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
