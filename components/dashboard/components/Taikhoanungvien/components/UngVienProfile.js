import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { useState, memo, useEffect } from 'react';

import { TinhTrang, provinces } from '../../../../../data/data';
import useValidate from '../../../../../app/hook/useValidate';
import {
    getAllBangCap,
    getAllKinhghiem,
    getAllNganhNghe,
    getAllViTriMongMuon,
    getAllMucLuong,
} from '../../../../../services/siteServices';
import convertTime from '../../../../../app/@func/convertTime/convertTime';

function UngVienProfile({ cx = () => {}, data, handleSublit = () => {} }) {
    const ref = useRef(null);

    const [ungVienState, setUngVienSate] = useState({
        hoVaTen: '',
        email: '',
        soDienThoai: '',
        diaChi: '',
        gioiTinh: true,
        sinhNhat: '',
        linhVucLamVec: '',
        diaDiemLamViec: '',
        viTriMongMuon: '',
        capBacUngTuyen: '',
        kinhNghiemLamViec: '',
        hocVan: '',
        mucLuong: '',
        des: '',
        mucTieuNgheNghiep: '',
        docThan: true,
        trinhDoTiengAnh: '',

        kinhNghiemLamViecRender: [],
        nghanhNgheRender: [],
        CapbacRender: [],
        HocVanRender: [],
        KinhNghiemRender: [],
        MucLuongRender: [],
        TinhTrangRender: [],
        ViTriMongMuonRender: [],
        majorsRender: [],
    });

    useEffect(() => {
        if (!_.isEmpty(data)) {
            setUngVienSate((prev) => ({
                ...prev,
                hoVaTen: data.hoVaTen,
                email: data.email,
                soDienThoai: data.soDienThoai,
                diaChi: data.diaChi,
                gioiTinh: data.isMale,
                sinhNhat: data.sinhNhat,
                linhVucLamVec: data.linhVucNgheNghiep,
                diaDiemLamViec: data.diaDiemMongMuonLamViec,
                viTriMongMuon: data.viTriMongMuon,
                capBacUngTuyen: data.capBac,
                kinhNghiemLamViec: data.kinhNghiem,
                hocVan: data.hocVan,
                mucLuong: data.mucLuongMongMuon,
                des: data.gioiThieu,
                mucTieuNgheNghiep: data.mucTieuNgheNghiep,
                docThan: data.docThan,
                trinhDoTiengAnh: data.trinhDoTiengAnh,
            }));
        }
    }, [data]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [ResKinhNghiem, ResNghanhNghe, ResCapbac, ResBangCap, ResMucLuong] = await Promise.all([
                    getAllKinhghiem(),
                    getAllNganhNghe(),
                    getAllViTriMongMuon(),
                    getAllBangCap(),
                    getAllMucLuong(),
                ]);

                if (ResKinhNghiem && ResNghanhNghe && ResBangCap && ResMucLuong) {
                    setUngVienSate((prev) => ({
                        ...prev,
                        kinhNghiemLamViecRender: ResKinhNghiem.data,
                        nghanhNgheRender: ResNghanhNghe.data,
                        CapbacRender: ResCapbac.data,
                        HocVanRender: ResBangCap.data,
                        MucLuongRender: ResMucLuong.data,
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetch();
    }, []);

    // ES6+
    const handleBuildData = () => {
        const {
            hoVaTen,
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
            trinhDoTiengAnh,
        } = ungVienState;

        const check = useValidate([hoVaTen]);

        if (!check) return {};

        return {
            hoVaTen,
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUngVienSate((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnKeyDown = (e) => {
        if (e.keyCode === 13) {
            const button = ref.current;

            if (button) {
                button.click();
            }
        }
    };

    return (
        <>
            <div className="row" onKeyDown={(e) => handleOnKeyDown(e)}>
                <div className="col-6 mt-3">
                    <label htmlFor="fullName">Họ và tên :</label>
                    <input
                        onChange={handleChange}
                        id="fullName"
                        name="hoVaTen"
                        type="text"
                        placeholder="Nguyen Van A"
                        value={ungVienState.hoVaTen}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="email">Email : </label>
                    <input
                        disabled
                        id="email"
                        type="email"
                        placeholder={ungVienState.email ? ungVienState.email : 'khachhangtruycapweb@gmail.com'}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="address">Địa chỉ : </label>
                    <input
                        onChange={handleChange}
                        id="address"
                        type="text"
                        name="diaChi"
                        placeholder="Eg: Hà Nội"
                        value={ungVienState.diaChi}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="phone">Số điện thoại : </label>
                    <input
                        onChange={handleChange}
                        id="phone"
                        type="number"
                        name="soDienThoai"
                        placeholder="012345678"
                        value={ungVienState.soDienThoai}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="birthDay">Ngày sinh : </label>
                    <input
                        id="birthDay"
                        onChange={handleChange}
                        type="text"
                        name="sinhNhat"
                        placeholder="012345678"
                        value={convertTime(ungVienState.sinhNhat)}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="gender">Giới tính : </label>
                    <select name="gioiTinh" onChange={handleChange} id="" value={ungVienState.gioiTinh}>
                        <option value="true">Nam</option>
                        <option value="false">Nữ</option>
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="viTriMongMuon">Vị trí mong muốn : </label>
                    <input
                        name="viTriMongMuon"
                        id="viTriMongMuon"
                        onChange={handleChange}
                        type="text"
                        placeholder="Intern Front End"
                        value={ungVienState.viTriMongMuon}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label>Cấp bậc ứng tuyển : </label>
                    <select value={ungVienState.capBacUngTuyen} name="capBacUngTuyen" onChange={handleChange}>
                        {ungVienState.CapbacRender &&
                            ungVienState.CapbacRender.length > 0 &&
                            ungVienState.CapbacRender.map((item) => {
                                return (
                                    <option key={item.id} value={item.ten}>
                                        {item.ten}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>Kinh nghiệm làm việc : </label>
                    <select value={ungVienState.kinhNghiemLamViec} name="kinhNghiemLamViec" onChange={handleChange}>
                        {ungVienState.kinhNghiemLamViecRender &&
                            ungVienState.kinhNghiemLamViecRender.length > 0 &&
                            ungVienState.kinhNghiemLamViecRender.map((item) => {
                                return (
                                    <option key={item.id} value={item.ten}>
                                        {item.ten}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>Học vấn : </label>
                    <select value={ungVienState.hocVan} name="hocVan" onChange={handleChange}>
                        {ungVienState.HocVanRender &&
                            ungVienState.HocVanRender.length > 0 &&
                            ungVienState.HocVanRender.map((item) => {
                                const id = uuidv4();

                                return (
                                    <option key={id} value={item.ten}>
                                        {item.ten}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="price">Mức lương mong muốn : </label>
                    <select value={ungVienState.mucLuong} name="mucLuong" onChange={handleChange}>
                        {ungVienState.MucLuongRender &&
                            ungVienState.MucLuongRender.length > 0 &&
                            ungVienState.MucLuongRender.map((item) => {
                                const id = uuidv4();

                                return (
                                    <option key={id} value={item.ten}>
                                        {item.ten}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>Lĩnh vực muốn làm việc : </label>
                    <select value={ungVienState.linhVucLamVec} name="linhVucLamVec" onChange={handleChange}>
                        {ungVienState.nghanhNgheRender &&
                            ungVienState.nghanhNgheRender.length > 0 &&
                            ungVienState.nghanhNgheRender.map((item) => {
                                return (
                                    <option key={item.id} value={item.ten}>
                                        {item.ten}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>Địa điểm làm việc : </label>
                    <select onChange={handleChange} value={ungVienState.diaDiemLamViec} name="diaDiemLamViec">
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
                    <select onChange={handleChange} name="docThan" value={ungVienState.docThan}>
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
                        value={ungVienState.mucTieuNgheNghiep}
                        name="mucTieuNgheNghiep"
                        onChange={handleChange}
                        id="muctie-nghe-nghiep"
                        type="text"
                        placeholder="Mục tiêu nghề nghiệp của bạn...."
                    />
                </div>
                <div className="col-12 mt-3">
                    <label htmlFor="desc">Giới thiệu ngắn về bản thân : </label>
                    <textarea
                        value={ungVienState.des}
                        name="des"
                        onChange={handleChange}
                        id="desc"
                        type="text"
                        placeholder="Giới thiệu ngắn...."
                    />
                </div>
                <div className="col-12 mt-4">
                    <button ref={ref} onClick={() => handleSublit(handleBuildData())} className="btn btn-primary">
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
