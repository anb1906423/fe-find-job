import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '../../../../styles/taikhoan.module.scss';
import { UploadImage } from '../../../../services/siteServices';
import { REACT_APP_UPLOAD_PRESET, backendAPI } from '../../../../config';
import LoadingProgress from '../../../../app/components/LoadingProgress';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import axios from '../../../../pages/api/axiosApi';
import { CodeGender, roleUser } from '../../../../util/constant';
import UngVienProfile from './components/UngVienProfile';
import NhaTuyenDungProfile from './components/NhaTuyenDungProfile';

const cx = classNames.bind(styles);

const MeProfile = () => {
    const isLogin = useSelector((state) => state.user.isLoggedIn);
    const roleUserLogin = useSelector((state) =>
        state && state.user && state.user.userInfo ? state.user.userInfo.role : null,
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
    const [maSoThue, datMaSoThue] = useState(0);
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

            if (roleUserLogin === roleUser.UngVien) {
                datHoTen(data.hoVaTen);
                datEmail(data.email);
                datSoDienThoai(data.soDienThoai);
                datDiaChi(data.diaChi);
                datGioiTinh(data.isMale);
                datSinhNhat(data.sinhNhat.slice(0, 10));
            }

            if (roleUserLogin === roleUser.NhaTuyenDung) {
                datHoTen(data.tenCty);
                datEmail(data.email);
                datSoDienThoai(data.soDienThoai);
                datDiaChi(data.diaChi);
                datMaSoThue(+data.maSoThue);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(roleUserLogin);

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
                        Xin chào{' '}
                        <b>
                            <i>{hoTen}</i>
                        </b>{' '}
                        dưới đây là thông tin của bạn
                    </h5>
                    <div className={cx('content')}>
                        <div className={cx('avatar')}>
                            <img src={hinhAnhDemo} alt="hình ảnh đại diện" onClick={() => handleClickAvatar()} />
                            <input onChange={(e) => handleChangeFile(e)} ref={ref} type="file" hidden />
                        </div>

                        {roleUserLogin === roleUser.UngVien && (
                            <UngVienProfile
                                cx={cx}
                                isEdit={isEdit}
                                datHoTen={datHoTen}
                                datDiaChi={datDiaChi}
                                datGioiTinh={datGioiTinh}
                                datSinhNhat={datSinhNhat}
                                datSoDienThoai={datSoDienThoai}
                                hoTen={hoTen}
                                soDienThoai={soDienThoai}
                                email={email}
                                sinhNhat={sinhNhat}
                                gioiTinh={gioiTinh}
                                handleSublit={handleSublit}
                                diaChi={diaChi}
                            />
                        )}
                        {roleUserLogin === roleUser.NhaTuyenDung && (
                            <NhaTuyenDungProfile
                                cx={cx}
                                isEdit={isEdit}
                                datHoTen={datHoTen}
                                datDiaChi={datDiaChi}
                                datSoDienThoai={datSoDienThoai}
                                hoTen={hoTen}
                                soDienThoai={soDienThoai}
                                email={email}
                                handleSublit={handleSublit}
                                diaChi={diaChi}
                                maSoThue={maSoThue}
                                datMaSoThue={datMaSoThue}
                            />
                        )}
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
