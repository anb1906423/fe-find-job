import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '../../../../styles/taikhoan.module.scss';
import { provinces } from '../../../../data/data';
import { UploadImage } from '../../../../services/siteServices';
import { REACT_APP_UPLOAD_PRESET } from '../../../../config';
import LoadingProgress from '../../../../app/components/LoadingProgress';

const cx = classNames.bind(styles);

const MeProfile = () => {
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hinhAnhDemo, datHinhAnhDemo] = useState(
        'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png',
    );
    const [hoTen, datHoTen] = useState('');
    const [email, datEmail] = useState('');
    const [soDienThoai, datSoDienThoai] = useState('');
    const [linhVucLamVec, datLinhVucLamViec] = useState(null);
    const [diaDiemLamViec, datDiaDiemLamViec] = useState(null);

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
            {isLoading && <LoadingProgress />}
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
                        <div className="col-12 mt-4">
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
