import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { useState, memo, useEffect } from 'react';

import {
    Capbac,
    HocVan,
    KinhNghiem,
    MucLuong,
    TinhTrang,
    ViTriMongMuon,
    majors,
    provinces,
} from '../../../../../data/data';
import useValidate from '../../../../../app/hook/useValidate';

function NhaTuyenDungProfile({ cx = () => {}, data, handleSublit = () => {} }) {
    const [hoTen, datHoTen] = useState('');
    const [email, datEmail] = useState('');
    const [soDienThoai, datSoDienThoai] = useState('');
    const [diaChi, datDiaChi] = useState('');
    const [gioiTinh, datGioiTinh] = useState(true);
    const [sinhNhat, datSinhNhat] = useState('');
    const [linhVucLamVec, datLinhVucLamViec] = useState('');
    const [diaDiemLamViec, datDiaDiemLamViec] = useState('');
    const [viTriMongMuon, datViTriMongMuon] = useState('');
    const [capBacUngTuyen, datCapBacUngTuyen] = useState('');
    const [kinhNghiemLamViec, datKinhNghiemLamViec] = useState('');
    const [hocVan, datHocVan] = useState('');
    const [mucLuong, datMucLuong] = useState('');
    const [des, setDes] = useState('');
    const [mucTieuNgheNghiep, datMucTieuNgheNghiep] = useState('');
    const [docThan, datDocThan] = useState(true);

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

    // ES6+
    const handleBuildData = () => {
        const check = useValidate([
            hoTen,
            soDienThoai,
            diaChi,
            gioiTinh,
            sinhNhat,
            linhVucLamVec,
            diaDiemLamViec,
            viTriMongMuon,
            capBacUngTuyen,
            kinhNghiemLamViec,
            hocVan,
            mucLuong,
            des,
            mucTieuNgheNghiep,
            docThan,
        ]);

        if (!check) return {};

        return {
            hoVaTen: hoTen,
            soDienThoai,
            diaChi,
            isMale: gioiTinh,
            sinhNhat: sinhNhat,
            linhVucNgheNghiep: linhVucLamVec,
            diaDiemMongMuonLamViec: diaDiemLamViec,
            viTriMongMuon,
            capBac: capBacUngTuyen,
            kinhNghiem: kinhNghiemLamViec,
            hocVan,
            mucLuongMongMuon: mucLuong,
            gioiThieu: des,
            mucTieuNgheNghiep,
            docThan,
        };
    };

    return (
        <>
            <div className="row">
                <div className="col-6 mt-3">
                    <label htmlFor="fullName">H??? v?? t??n :</label>
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
                        disabled
                        id="email"
                        type="email"
                        placeholder="khachhangtruycapweb@gmail.com"
                        onChange={(e) => datEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="address">?????a ch??? : </label>
                    <input
                        onChange={(e) => datDiaChi(e.target.value)}
                        id="address"
                        type="text"
                        placeholder="Eg: H?? N???i"
                        value={diaChi}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="phone">S??? ??i???n tho???i : </label>
                    <input
                        onChange={(e) => datSoDienThoai(e.target.value)}
                        id="phone"
                        type="number"
                        placeholder="012345678"
                        value={soDienThoai}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="birthDay">Ng??y sinh : </label>
                    <input
                        onChange={(e) => datSinhNhat(e.target.value)}
                        id="birthDay"
                        type="date"
                        placeholder="012345678"
                        value={sinhNhat}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="gender">Gi???i t??nh : </label>
                    <select onChange={(e) => datGioiTinh(e.target.value)} name="" id="" value={gioiTinh}>
                        <option value="true">Nam</option>
                        <option value="false">N???</option>
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>V??? tr?? mong mu???n : </label>
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
                    <label>C???p b???c ???ng tuy???n : </label>
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
                    <label>Kinh nghi???m l??m vi???c : </label>
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
                    <label>H???c v???n : </label>
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
                    <label htmlFor="price">M???c l????ng mong mu???n : </label>
                    <select value={mucLuong} onChange={(e) => datMucLuong(e.target.value)}>
                        {MucLuong &&
                            MucLuong.length > 0 &&
                            MucLuong.map((item) => {
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
                    <label>L??nh v???c mu???n l??m vi???c : </label>
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
                    <label>?????a ??i???m l??m vi???c : </label>
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
                    <label>T??nh tr???ng hi???n t???i : </label>
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
                    <label htmlFor="muctie-nghe-nghiep">M???c ti??u ngh??? nghi???p : </label>
                    <textarea
                        value={mucTieuNgheNghiep}
                        onChange={(e) => datMucTieuNgheNghiep(e.target.value)}
                        id="muctie-nghe-nghiep"
                        type="text"
                        placeholder="M???c ti??u ngh??? nghi???p c???a b???n...."
                    />
                </div>
                <div className="col-12 mt-3">
                    <label htmlFor="desc">Gi???i thi???u ng???n v??? b???n th??n : </label>
                    <textarea
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                        id="desc"
                        type="text"
                        placeholder="Gi???i thi???u ng???n...."
                    />
                </div>
                <div className="col-12 mt-4">
                    <button onClick={() => handleSublit(handleBuildData())} className="btn btn-primary">
                        L??u th??ng tin
                    </button>
                </div>
            </div>
        </>
    );
}

NhaTuyenDungProfile.propTypes = {
    cx: PropTypes.func,
    handleSublit: PropTypes.func,
};

export default memo(NhaTuyenDungProfile);
