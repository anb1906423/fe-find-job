import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '../../../../styles/taikhoan.module.scss';
import { provinces } from '../../../../data/data';
import { UploadImage } from '../../../../services/siteServices';
import { REACT_APP_UPLOAD_PRESET, backendAPI } from '../../../../config';
import LoadingProgress from '../../../../app/components/LoadingProgress';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import axios from '../../../../pages/api/axiosApi';
import { CodeGender, roleUser } from '../../../../util/constant';

const cx = classNames.bind(styles);

const MeProfile = () => {
    const isLogin = useSelector((state) => state.user.isLoggedIn);
    const roleUserLogin = useSelector((state) =>
        state && state.user && state.user.userInfo && state.user.userInfo.role ? state.user.userInfo.role : null,
    );
    const userID = useSelector((state) =>
        state && state.user && state.user.userInfo && state.user.userInfo.id ? state.user.userInfo.id : null,
    );

    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [hinhAnhDemo, datHinhAnhDemo] = useState(
        'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png',
    );
    const [hoTen, datHoTen] = useState('');
    const [email, datEmail] = useState('');
    const [soDienThoai, datSoDienThoai] = useState('');
    const [diaChi, datDiaChi] = useState('');
    const [gioiTinh, datGioiTinh] = useState(true);
    const [sinhNhat, datSinhNhat] = useState('');
    const [linhVucLamVec, datLinhVucLamViec] = useState(null);
    const [diaDiemLamViec, datDiaDiemLamViec] = useState(null);

    const ref = useRef(null);

    const fetch = async () => {
        try {
            setIsLoading(true);

            const Res = await axios(
                `${backendAPI}/${
                    roleUserLogin === roleUser.UngVien
                        ? 'ung-vien'
                        : roleUserLogin === roleUser.NhaTuyenDung
                        ? 'nha-tuyen-dung'
                        : 'admin'
                }/${userID}`,
            );

            setIsLoading(false);

            const { data } = Res;

            datHoTen(data.hoVaTen);
            datEmail(data.email);
            datSoDienThoai(data.soDienThoai);
            datDiaChi(data.diaChi);
            datGioiTinh(data.isMale);
            datSinhNhat(data.sinhNhat.slice(0, 10));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isLogin) {
            fetch();
        }
    }, []);

    const handleClickAvatar = () => {
        const inputEle = ref.current;

        if (!inputEle) return;

        inputEle.click();
    };

    // lắng nghe sự thay đổi avatar
    const handleChangeFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size >= 1500000) {
                alert('Vui lòng chọn file có dung lượng dưới 1.5MB');
                return;
            }

            setAvatar(file);
            datHinhAnhDemo(URL.createObjectURL(file));
        }
    };

    // useEffect(() => {
    //     setIsEdit(true);
    // }, [hoTen, email, diaChi, soDienThoai]);

    // lưu dữ liệu thay đổi
    const handleSublit = async () => {
        if (!avatar) {
            alert('Hãy chọn ảnh!');
            return;
        }
        // đăng tải ảnh
        const Res = await UploadImage({
            file: avatar,
            upload_preset: REACT_APP_UPLOAD_PRESET,
        });
    };

    return (
        <div className={cx('tai-khoan-cua-toi-wp')}>
            {isLoading && <LoadingProgress />}
            {isLogin ? (
                <div className="container">
                    <h5 className={cx('tieu-de', 'text-center', 'py-4')}>
                        Xin chào bạn Nguyễn Văn A dưới đây là thông tin của bạn
                    </h5>
                    <div className={cx('content')}>
                        <div className={cx('avatar')}>
                            <img src={hinhAnhDemo} alt="hình ảnh đại diện" onClick={() => handleClickAvatar()} />
                            <input onChange={(e) => handleChangeFile(e)} ref={ref} type="file" hidden />
                        </div>
                        <div className="row">
                            <div className="col-6 mt-3">
                                <label htmlFor="fullName">Họ và tên :</label>
                                <input
                                    onChange={(e) => datHoTen(e.target.value)}
                                    id="fullName"
                                    type="text"
                                    placeholder="Nguyen Van A"
                                    value={hoTen}
                                />
                            </div>
                            <div className="col-6 mt-3">
                                <label htmlFor="email">Email : </label>
                                <input
                                    onChange={(e) => datEmail(e.target.value)}
                                    id="email"
                                    type="email"
                                    placeholder="khachhangtruycapweb@gmail.com"
                                    value={email}
                                />
                            </div>
                            <div className="col-6 mt-3">
                                <label htmlFor="address">Địa chỉ : </label>
                                <input
                                    onChange={(e) => datDiaChi(e.target.value)}
                                    id="address"
                                    type="text"
                                    placeholder="Eg: Hà Nội"
                                    value={diaChi}
                                />
                            </div>
                            <div className="col-6 mt-3">
                                <label htmlFor="phone">Số điện thoại : </label>
                                <input
                                    onChange={(e) => datSoDienThoai(e.target.value)}
                                    id="phone"
                                    type="number"
                                    placeholder="012345678"
                                    value={soDienThoai}
                                />
                            </div>
                            <div className="col-6 mt-3">
                                <label htmlFor="birthDay">Ngày sinh : </label>
                                <input
                                    onChange={(e) => datSinhNhat(e.target.value)}
                                    id="birthDay"
                                    type="date"
                                    placeholder="012345678"
                                    value={sinhNhat}
                                />
                            </div>
                            <div className="col-6 mt-3">
                                <label htmlFor="gender">Giới tính : </label>
                                <select onChange={(e) => datGioiTinh(e.target.value)} name="" id="" value={gioiTinh}>
                                    <option value="true">Nam</option>
                                    <option value="false">Nữ</option>
                                </select>
                            </div>
                            <div className="col-6 mt-3">
                                <label>Lĩnh vực muốn làm việc : </label>
                                <select>
                                    <option value="">IT - Công Nghệ Phần Mềm</option>
                                    <option value="">Sale - Chuyên Viên Bán Hàng</option>
                                    <option value="">Teacher - Giáo viên dạy thêm</option>
                                </select>
                            </div>
                            <div className="col-6 mt-3">
                                <label>Địa điểm làm việc : </label>
                                <select name="" id="">
                                    {provinces &&
                                        provinces.length > 0 &&
                                        provinces.map((item) => {
                                            const id = uuidv4();

                                            return (
                                                <option key={id} value="">
                                                    {item}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            {isEdit && (
                                <div className="col-12 mt-4">
                                    <button onClick={handleSublit} className="btn btn-primary">
                                        Lưu thông tin
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('chua-dang-nhap')}>
                    <p className="text-center">
                        <span>
                            Bạn chưa đăng nhập ấn vào{' '}
                            <Link href="/dang-nhap/ung-vien" className="mx-1">
                                đây đăng nhập với ứng viên
                            </Link>{' '}
                            hoặc{' '}
                            <Link href="/dang-nhap/nha-tuyen-dung" className="mx-1">
                                đây đăng nhập với Nhà tuyển dụng
                            </Link>
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default MeProfile;
