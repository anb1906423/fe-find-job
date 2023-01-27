import React from 'react';
import Heading from '../../components/Heading';
import Link from 'next/link';

const DangNhapUngVien = () => {
    return (
        <div className="trang-dang-nhap pt-3 pb-5">
            <Heading tieuDe="Đăng nhập ứng viên" />
            <div className="chua-form-dang-nhap">
                <form className="row g-3 form-dang-nhap">
                    <div className="col-md-12">
                        <label for="inputEmail4" className="form-label">
                            Email đăng nhập
                        </label>
                        <input type="email" className="form-control" placeholder="Email" id="inputEmail4" />
                    </div>
                    <div className="col-md-12">
                        <label for="inputPassword4" className="form-label">
                            Mật khẩu
                        </label>
                        <input type="password" className="form-control" placeholder="Mật khẩu" id="inputPassword4" />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn nut-dang-nhap w-100">
                            Đăng nhập
                        </button>
                    </div>
                    <div className="w-100 text-center">
                        <p>
                            Chưa có tài khoản?{' '}
                            <Link style={{ textDecoration: 'none' }} href="/dang-ky/ung-vien">
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DangNhapUngVien;
