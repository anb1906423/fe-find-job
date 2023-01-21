import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '../../styles/taikhoan.module.scss';
import { provinces } from '../../data/data';
import { UploadImage } from '../../services/siteServices';
import { REACT_APP_UPLOAD_PRESET } from '../../config';
import SkeletonLoading from '../../app/components/SkeletonLoading/SkeletonLoading';
import LoadingProgress from '../../app/components/LoadingProgress';

const cx = classNames.bind(styles);

const MeProfile = () => {
    const [avatar, setAvatar] = useState(null);
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
    const [hinhAnhDemo, datHinhAnhDemo] = useState(
        'https://res.cloudinary.com/dnn5yfz32/image/upload/v1671186521/pcstezkktuf8maom1naw.jpg',
    );

    const ref = useRef(null);

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

    console.log(hinhAnhDemo);

    return (
        <div className={cx('tai-khoan-cua-toi-wp')}>
            <LoadingProgress />
            <div className="container">
                <h5 className={cx('tieu-de', 'text-center', 'py-4')}>
                    Xin chào bạn Nguyễn Văn A dưới đây là thông tin của bạn
                </h5>
                <div className={cx('content')}>
                    <div className={cx('avatar')}>
                        {isLoadingAvatar ? (
                            <SkeletonLoading
                                width={110}
                                height={110}
                                borderRadius={50}
                                className={cx('cho-hinh-anh-duoc-load')}
                            />
                        ) : (
                            <img
                                onLoadStart={() => setIsLoadingAvatar(true)}
                                onLoad={() => setIsLoadingAvatar(false)}
                                src={hinhAnhDemo}
                                alt="hình ảnh đại diện"
                                onClick={() => handleClickAvatar()}
                            />
                        )}
                        <input onChange={(e) => handleChangeFile(e)} ref={ref} type="file" hidden />
                    </div>
                    <div className="row">
                        <div className="col-6 mt-3">
                            <label>Họ và tên :</label>
                            <input type="text" placeholder="Nguyen Van A" value="Nguyen van A" />
                        </div>
                        <div className="col-6 mt-3">
                            <label>Email : </label>
                            <input
                                type="text"
                                placeholder="khachhangtruycapweb@gmail.com"
                                value="khachhangtruycapweb@gmail.com"
                            />
                        </div>
                        <div className="col-6 mt-3">
                            <label>Số điện thoại : </label>
                            <input type="text" placeholder="012345678" value="012345678" />
                        </div>
                        <div className="col-6 mt-3">
                            <label>Lĩnh vực muốn làm việc : </label>
                            <select name="" id="">
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
                        <div className="col-12">
                            <button onClick={handleSublit} className="btn btn-primary">
                                Lưu thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeProfile;
