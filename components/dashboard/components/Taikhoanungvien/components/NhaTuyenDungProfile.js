import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { provinces } from '../../../../../data/data';

function NhaTuyenDungProfile({
    cx = () => {},
    isEdit = true,
    datHoTen = () => {},
    datDiaChi = () => {},
    datSoDienThoai = () => {},
    hoTen = '',
    soDienThoai = '',
    email = '',
    datMaSoThue = () => {},
    maSoThue = '',
    handleSublit = () => {},
    diaChi = '',
}) {
    return (
        <>
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
                    <input disabled id="email" type="email" placeholder="khachhangtruycapweb@gmail.com" value={email} />
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
                    <label htmlFor="maSoThue">Mã số thuế : </label>
                    <input
                        onChange={(e) => datMaSoThue(e.target.value)}
                        id="maSoThue"
                        type="number"
                        placeholder="012345678"
                        value={maSoThue}
                    />
                </div>
                {/* <div className="col-6 mt-3">
                    <label htmlFor="birthDay">Ngày sinh : </label>
                    <input
                        onChange={(e) => datSinhNhat(e.target.value)}
                        id="birthDay"
                        type="date"
                        placeholder="012345678"
                        value={sinhNhat}
                    />
                </div> */}
                {/* <div className="col-6 mt-3">
                    <label htmlFor="gender">Giới tính : </label>
                    <select onChange={(e) => datGioiTinh(e.target.value)} name="" id="" value={gioiTinh}>
                        <option value="true">Nam</option>
                        <option value="false">Nữ</option>
                    </select>
                </div> */}
                {/* <div className="col-6 mt-3">
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
                </div> */}
                {isEdit && (
                    <div className="col-12 mt-4">
                        <button onClick={handleSublit} className="btn btn-primary">
                            Lưu thông tin
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

NhaTuyenDungProfile.propTypes = {
    cx: PropTypes.func,
    isEdit: PropTypes.bool,
    datHoTen: PropTypes.func,
    datDiaChi: PropTypes.func,
    datSoDienThoai: PropTypes.func,
    hoTen: PropTypes.string,
    maSoThue: PropTypes.number,
    soDienThoai: PropTypes.string,
    email: PropTypes.string,
    handleSublit: PropTypes.func,
    diaChi: PropTypes.string,
    datMaSoThue: PropTypes.func,
};

export default NhaTuyenDungProfile;
