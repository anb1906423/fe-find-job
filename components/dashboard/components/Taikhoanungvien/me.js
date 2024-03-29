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
import { useCallback } from 'react';
import Loading from '../../../../app/components/loading/loading';
import _, { xor } from 'lodash';
import { swtoast } from '../../../../mixins/swal.mixin';
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
    const [isUpLoadAvatar, setIsUpLoadAvatar] = useState(true);
    const [hinhAnhDemo, datHinhAnhDemo] = useState('');

    const [data, setData] = useState();

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

            setData(data);

            // Xin loi anh chi logic doan nay hoi dau mat <3
            datHinhAnhDemo(
                roleUserLogin === roleUser.UngVien
                    ? data.avatar
                    : data.logoCty
                    ? roleUserLogin === roleUser.UngVien
                        ? data.avatar
                        : data.logoCty
                    : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png',
            );
            setIsUpLoadAvatar(
                roleUserLogin === roleUser.UngVien ? (data.avatar ? false : true) : data.logoCty ? false : true,
            );

            setAvatar(
                roleUserLogin === roleUser.UngVien
                    ? data.avatar
                        ? data.avatar
                        : null
                    : data.logoCty
                    ? data.logoCty
                    : null,
            );
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

        console.log(file);

        if (file) {
            if (file.size >= 1500000) {
                swtoast.fire({
                    text: 'Vui lòng chọn file có dung lượng dưới 1.5MB',
                });
                return;
            }
            setIsUpLoadAvatar(true);
            setAvatar(file);
            datHinhAnhDemo(URL.createObjectURL(file));
        }
    };

    // lưu dữ liệu thay đổi
    const handleSublit = async (data) => {
        console.log(data);

        if (_.isEmpty(data)) return;

        // đăng tải ảnh
        let ResImg;

        if (isUpLoadAvatar) {
            if (!avatar) {
                alert('Bạn chưa chọn hình ảnh !');
            } else {
                setIsLoading(true);
                ResImg = await UploadImage({
                    file: avatar,
                    upload_preset: REACT_APP_UPLOAD_PRESET,
                });
            }
        }

        if (!ResImg && isUpLoadAvatar) return;

        const uploadRender = roleUserLogin === roleUser.UngVien ? 'avatar' : 'logoCty';

        const dataBuild = { ...data, [uploadRender]: isUpLoadAvatar ? ResImg.data.url : hinhAnhDemo };

        console.log('tét');

        try {
            const Res = await axios.put(
                `${backendAPI}/${
                    roleUserLogin === roleUser.UngVien
                        ? 'ung-vien'
                        : roleUserLogin === roleUser.NhaTuyenDung
                        ? 'nha-tuyen-dung'
                        : 'admin'
                }/${userID}`,
                dataBuild,
                { withCredentials: true },
            );

            if (Res) {
                fetch();
                swtoast.success({
                    text: 'Bạn đã cập nhật thông tin thành công!',
                });
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className={cx('tai-khoan-cua-toi-wp')}>
                {isLoading && <LoadingProgress />}
                {isLogin ? (
                    <div className="container">
                        <h5 className={cx('tieu-de', 'text-center', 'py-4')}>
                            {roleUserLogin === roleUser.UngVien && 'THÔNG TIN CÁ NHÂN'}
                            {roleUserLogin === roleUser.NhaTuyenDung && 'THÔNG TIN TỔNG QUAN'}
                            {/* Xin chào bạn dưới đây là thông tin của bạn */}
                        </h5>
                        <div className={cx('content')}>
                            <div className={cx('avatar')}>
                                <img src={hinhAnhDemo} alt="hình ảnh đại diện" onClick={() => handleClickAvatar()} />
                                <input onChange={(e) => handleChangeFile(e)} ref={ref} type="file" hidden />
                            </div>
                            {/* Dựa vào cái role để quết định xem mình sẽ render cái view nào ( để biết thêm hãy đọc hethong.txt ) */}
                            {roleUserLogin === roleUser.UngVien && (
                                <UngVienProfile handleSublit={handleSublit} cx={cx} data={data} />
                            )}
                            {roleUserLogin === roleUser.NhaTuyenDung && (
                                <NhaTuyenDungProfile handleSubmit={handleSublit} cx={cx} data={data} />
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
        </>
    );
};

export default MeProfile;
