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
            setIsUpLoadAvatar(data.avatar ? false : true);
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

    // l???ng nghe s??? thay ?????i avatar
    const handleChangeFile = (e) => {
        const file = e.target.files[0];

        console.log(file);

        if (file) {
            if (file.size >= 1500000) {
                swtoast.fire({
                    text: 'Vui l??ng ch???n file c?? dung l?????ng d?????i 1.5MB',
                });
                return;
            }
            setIsUpLoadAvatar(true);
            setAvatar(file);
            datHinhAnhDemo(URL.createObjectURL(file));
        }
    };

    // l??u d??? li???u thay ?????i
    const handleSublit = useCallback(async (data) => {
        if (!avatar && isUpLoadAvatar) {
            // alert('H??y ch???n ???nh!');
            return;
        }

        if (_.isEmpty(data)) return;

        setIsLoading(true);

        // ????ng t???i ???nh
        let ResImg;

        if (isUpLoadAvatar) {
            ResImg = await UploadImage({
                file: avatar,
                upload_preset: REACT_APP_UPLOAD_PRESET,
            });
        }

        if (!ResImg && isUpLoadAvatar) return;

        const dataBuild = { ...data, avatar: isUpLoadAvatar ? ResImg.data.url : hinhAnhDemo };

        try {
            const Res = await axios.put(`${backendAPI}/ung-vien/${userID}`, dataBuild, { withCredentials: true });

            if (Res) {
                fetch();
                swtoast.success({
                    text: 'B???n ???? c???p nh???t th??ng tin th??nh c??ng!',
                });
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    });

    console.log(avatar);

    return (
        <>
            {isLoading && <Loading />}
            <div className={cx('tai-khoan-cua-toi-wp')}>
                {isLoading && <LoadingProgress />}
                {isLogin ? (
                    <div className="container">
                        <h5 className={cx('tieu-de', 'text-center', 'py-4')}>
                            Xin ch??o b???n d?????i ????y l?? th??ng tin c???a b???n
                        </h5>
                        <div className={cx('content')}>
                            <div className={cx('avatar')}>
                                <img src={hinhAnhDemo} alt="h??nh ???nh ?????i di???n" onClick={() => handleClickAvatar()} />
                                <input onChange={(e) => handleChangeFile(e)} ref={ref} type="file" hidden />
                            </div>
                            {/* D???a v??o c??i role ????? qu???t ?????nh xem m??nh s??? render c??i view n??o ( ????? bi???t th??m h??y ?????c hethong.txt ) */}
                            {roleUserLogin === roleUser.UngVien && (
                                <UngVienProfile handleSublit={handleSublit} cx={cx} data={data} />
                            )}
                            {roleUserLogin === roleUser.NhaTuyenDung && (
                                <NhaTuyenDungProfile handleSublit={handleSublit} cx={cx} data={data} />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={cx('chua-dang-nhap')}>
                        <p className="text-center">
                            <span>
                                B???n ch??a ????ng nh???p ???n v??o{' '}
                                <Link href="/dang-nhap/ung-vien" className="mx-1">
                                    ????y ????ng nh???p v???i ???ng vi??n
                                </Link>{' '}
                                ho???c{' '}
                                <Link href="/dang-nhap/nha-tuyen-dung" className="mx-1">
                                    ????y ????ng nh???p v???i Nh?? tuy???n d???ng
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
