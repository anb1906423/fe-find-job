import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { useState, memo, useEffect } from 'react';

import { Capbac, HocVan, KinhNghiem, TinhTrang, ViTriMongMuon, majors, provinces } from '../../../../../data/data';

function UngVienProfile({ cx = () => { }, data, handleSublit = () => { } }) {
    const [hoTen, datHoTen] = useState('');
    const [email, datEmail] = useState('');
    const [soDienThoai, datSoDienThoai] = useState('');
    const [diaChi, datDiaChi] = useState('');
    const [gioiTinh, datGioiTinh] = useState(true);
    const [sinhNhat, datSinhNhat] = useState('');
    const [linhVucLamVec, datLinhVucLamViec] = useState(null);
    const [diaDiemLamViec, datDiaDiemLamViec] = useState(null);
    const [viTriMongMuon, datViTriMongMuon] = useState(null);
    const [capBacUngTuyen, datCapBacUngTuyen] = useState(null);
    const [kinhNghiemLamViec, datKinhNghiemLamViec] = useState(null);
    const [hocVan, datHocVan] = useState(null);
    const [mucLuong, datMucLuong] = useState(0);
    const [des, setDes] = useState('');
    const [mucTieuNgheNghiep, datMucTieuNgheNghiep] = useState('');
    const [docThan, datDocThan] = useState(null);

    useEffect(() => {
        if (!_.isEmpty(data)) {
            datHoTen(data.hoVaTen);
            datEmail(data.email);
            datSoDienThoai(data.soDienThoai);
            datDiaChi(data.diaChi);
            datGioiTinh(data.isMale);
            datSinhNhat(data.sinhNhat);
            datLinhVucLamViec(data.linhVucNgheNghiep);
            datDiaDiemLamViec(data.diaDiemMongMuonLamViec);
            datViTriMongMuon(data.viTriMongMuon);
            datCapBacUngTuyen(data.capBac);
            datKinhNghiemLamViec(data.kinhNghiem);
            datHocVan(data.hocVan);
            datMucLuong(data.mucLuongMongMuon);
            setDes(data.gioiThieu);
            datMucTieuNgheNghiep(data.mucTieuNgheNghiep);
            datDocThan(data.docThan);
        }
    }, [data]);

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
                    <label>Vị trí mong muốn : </label>
                    <select value={viTriMongMuon} onChange={(e) => datViTriMongMuon(e.target.value)}>
                        {ViTriMongMuon &&
                            ViTriMongMuon.length > 0 &&
                            ViTriMongMuon.map((item) => {
                                const id = uuidv4();

                                return (
                                    <option key={id} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>Cấp bậc ứng tuyển : </label>
                    <select value={capBacUngTuyen} onChange={(e) => datCapBacUngTuyen(e.target.value)}>
                        {Capbac &&
                            Capbac.length > 0 &&
                            Capbac.map((item) => {
                                const id = uuidv4();

                                return (
                                    <option key={id} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>Kinh nghiệm làm việc : </label>
                    <select value={kinhNghiemLamViec} onChange={(e) => datKinhNghiemLamViec(e.target.value)}>
                        {KinhNghiem &&
                            KinhNghiem.length > 0 &&
                            KinhNghiem.map((item) => {
                                const id = uuidv4();

                                return (
                                    <option key={id} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>Học vấn : </label>
                    <select value={hocVan} onChange={(e) => datHocVan(e.target.value)}>
                        {HocVan &&
                            HocVan.length > 0 &&
                            HocVan.map((item) => {
                                const id = uuidv4();

                                return (
                                    <option key={id} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="price">Mức lương mong muốn : </label>
                    <input
                        value={mucLuong}
                        onChange={(e) => datMucLuong(e.target.value)}
                        id="price"
                        type="text"
                        placeholder="10.000.000 đ"
                    />
                </div>
                <div className="col-6 mt-3">
                    <label>Lĩnh vực muốn làm việc : </label>
                    <select value={linhVucLamVec} onChange={(e) => datLinhVucLamViec(e.target.value)}>
                        {majors &&
                            majors.length > 0 &&
                            majors.map((item) => {
                                const id = uuidv4();

                                return (
                                    <option key={id} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>Địa điểm làm việc : </label>
                    <select
                        onChange={(e) => {
                            datDiaDiemLamViec(e.target.value);
                        }}
                        value={diaDiemLamViec}
                    >
                        {provinces &&
                            provinces.length > 0 &&
                            provinces.map((item) => {
                                const id = uuidv4();

                                return (
                                    <option key={id} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>Tình trạng hiện tại : </label>
                    <select
                        onChange={(e) => {
                            datDocThan(e.target.value);
                        }}
                        value={docThan}
                    >
                        {TinhTrang &&
                            TinhTrang.length > 0 &&
                            TinhTrang.map((item) => {
                                const id = uuidv4();

                                return (
                                    <option key={id} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-12 mt-3">
                    <label htmlFor="muctie-nghe-nghiep">Mục tiêu nghề nghiệp : </label>
                    <textarea
                        value={mucTieuNgheNghiep}
                        onChange={(e) => datMucTieuNgheNghiep(e.target.value)}
                        id="muctie-nghe-nghiep"
                        type="text"
                        placeholder="Mục tiêu nghề nghiệp của bạn...."
                    />
                </div>
                <div className="col-12 mt-3">
                    <label htmlFor="desc">Giới thiệu ngắn về bản thân : </label>
                    <textarea
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                        id="desc"
                        type="text"
                        placeholder="Giới thiệu ngắn...."
                    />
                </div>
                <div className="col-12 mt-4">
                    <button onClick={handleSublit} className="btn btn-primary">
                        Lưu thông tin
                    </button>
                </div>
            </div>
        </>
    );
}

UngVienProfile.propTypes = {
    cx: PropTypes.func,
    handleSublit: PropTypes.func,
};

export default memo(UngVienProfile);
