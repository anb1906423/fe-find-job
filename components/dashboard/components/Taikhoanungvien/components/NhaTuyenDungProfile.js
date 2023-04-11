import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { useState, memo, useEffect } from 'react';

import { VungDuLieu } from '../../../../../data/data';
import useValidate from '../../../../../app/hook/useValidate';
import { UploadImage, getAllLinhVucKinhDoanh, getAllQuiMo } from '../../../../../services/siteServices';
import { swtoast } from '../../../../../mixins/swal.mixin';
import { REACT_APP_UPLOAD_PRESET } from '../../../../../config';
import Loading from '../../../../../app/components/loading/loading';

function NhaTuyenDungProfile({ cx = () => {}, data, handleSubmit = () => {} }) {
    const ref = useRef(null);
    const refBanner = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const [nhaTuyendungState, setNhaTuyendungState] = useState({
        logoCty: '',
        tenCty: '',
        banner: '',
        email: '',
        soDienThoai: '',
        diaChi: '',
        khuVuc: '',
        gioiThieu: '',
        maSoThue: '',
        quiMo: '',
        website: '',
        linhVucNgheNghiep: '',
        anhCongTy: '',

        BannerFile: null,
        BannerPreView: '',

        isUploaded: false,

        QuyMoRende: [],
        LinhVucNgheNghiepRender: [],
    });

    useEffect(() => {
        if (!_.isEmpty(data)) {
            setNhaTuyendungState((prev) => ({
                ...prev,
                tenCty: data.tenCty,
                logoCty: data.logoCty,
                banner: data.banner,
                email: data.email,
                soDienThoai: data.soDienThoai,
                diaChi: data.diaChi,
                khuVuc: data.khuVuc,
                gioiThieu: data.gioiThieu,
                maSoThue: data.maSoThue,
                quiMo: data.quiMo,
                website: data.website,
                linhVucNgheNghiep: data.linhVucNgheNghiep,
                anhCongTy: data.logoCty,
                BannerPreView: data.banner,
                isUploaded: data.banner ? false : true,
            }));
        }
    }, [data]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [ResQuiMo, ResLinhVucNgheNghiep] = await Promise.all([getAllQuiMo(), getAllLinhVucKinhDoanh()]);

                if (ResQuiMo) {
                    ResQuiMo.data.unshift({ ten: "Chọn qui mô công ty" });
                    ResLinhVucNgheNghiep.data.unshift({ ten: "Chọn lĩnh vực nghề nghiệp" });
                    setNhaTuyendungState((prev) => ({
                        ...prev,
                        QuyMoRende: ResQuiMo.data,
                        LinhVucNgheNghiepRender: ResLinhVucNgheNghiep.data,
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetch();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNhaTuyendungState((prevState) => ({
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

    const handleClickChoooseBanner = () => {
        const inputElement = refBanner.current;

        if (inputElement) {
            inputElement.click();
        }
    };

    const handleChanegFileBanner = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size >= 1500000) {
                swtoast.fire({
                    text: 'Vui lòng chọn file có dung lượng dưới 1.5MB',
                });
                return;
            }

            setNhaTuyendungState((prev) => ({
                ...prev,
                BannerFile: file,
                BannerPreView: URL.createObjectURL(file),
                isUploaded: true,
            }));
        }
    };

    const handleChooseAgainBanner = () => {
        const check = confirm('Bạn chắc chắn với hành động của mình!');

        if (check) {
            URL.revokeObjectURL(nhaTuyendungState.BannerPreView);

            const inputElement = refBanner.current;
            if (inputElement) {
                inputElement.value = null;
            }

            setNhaTuyendungState((prev) => ({
                ...prev,
                BannerFile: null,
                BannerPreView: '',
                isUploaded: false,
            }));
        }
    };

    // ES6+
    const handleBuildData = async () => {
        const {
            logoCty,
            tenCty,
            banner,
            soDienThoai,
            diaChi,
            khuVuc,
            gioiThieu,
            maSoThue,
            quiMo,
            website,
            linhVucNgheNghiep,
            anhCongTy,

            isUploaded,
            BannerFile,
            BannerPreView,
        } = nhaTuyendungState;

        const check = useValidate([tenCty, soDienThoai, diaChi, maSoThue]);

        if (!check) return {};

        const dataBuild = {
            logoCty,
            tenCty,
            banner,
            soDienThoai,
            diaChi,
            khuVuc,
            gioiThieu,
            maSoThue,
            quiMo,
            website,
            linhVucNgheNghiep,
            anhCongTy,
        };

        if (isUploaded && BannerFile && BannerPreView) {
            setIsLoading(true);

            const ResUploadBanne = await UploadImage({
                file: BannerFile,
                upload_preset: REACT_APP_UPLOAD_PRESET,
            });

            setIsLoading(false);

            if (ResUploadBanne) {
                setNhaTuyendungState((prev) => ({
                    ...prev,
                    banner: ResUploadBanne.data.url,
                }));
            }
            dataBuild.banner = ResUploadBanne.data.url;
        }

        handleSubmit(dataBuild);

        return;
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className="col-12 mt-3">
                <div className="preview-banner">
                    <div className={nhaTuyendungState.BannerPreView ? 'not-overlay' : 'overlay-preview'}></div>
                    <img
                        className={nhaTuyendungState.BannerPreView ? 'preview-image' : 'not-image'}
                        src={
                            nhaTuyendungState.BannerPreView
                                ? nhaTuyendungState.BannerPreView
                                : 'https://internetviettel.vn/wp-content/uploads/2017/05/1-2.jpg'
                        }
                    />
                    {nhaTuyendungState.BannerPreView ? (
                        <span onClick={handleChooseAgainBanner} className="click-choose-image">
                            Chọn lại ảnh
                        </span>
                    ) : (
                        <span onClick={handleClickChoooseBanner} className="click-choose-image">
                            + image
                        </span>
                    )}
                </div>
                <input
                    accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
                    ref={refBanner}
                    hidden
                    id="banner"
                    type="file"
                    onChange={handleChanegFileBanner}
                />
            </div>
            <div className="row" onKeyDown={(e) => handleOnKeyDown(e)}>
                <div className="col-6 mt-3">
                    <label htmlFor="fullName">Họ và tên :</label>
                    <input
                        onChange={handleChange}
                        id="fullName"
                        value={nhaTuyendungState.tenCty}
                        name="tenCty"
                        type="text"
                        placeholder="Nguyen Van A"
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="email">Email : </label>
                    <input
                        disabled
                        id="email"
                        type="email"
                        placeholder={
                            nhaTuyendungState.email ? nhaTuyendungState.email : 'khachhangtruycapweb@gmail.com'
                        }
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="address">Địa chỉ : </label>
                    <input
                        onChange={handleChange}
                        id="address"
                        type="text"
                        value={nhaTuyendungState.diaChi}
                        name="diaChi"
                        placeholder="Eg: Hà Nội"
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
                        value={nhaTuyendungState.soDienThoai}
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="phone">Mã số thuế : </label>
                    <input
                        onChange={handleChange}
                        id="phone"
                        type="number"
                        value={nhaTuyendungState.maSoThue}
                        name="maSoThue"
                        placeholder="012345678"
                    />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="phone">website : </label>
                    <input
                        onChange={handleChange}
                        id="phone"
                        type="text"
                        value={nhaTuyendungState.website}
                        name="website"
                        placeholder="https://your-website.com"
                    />
                </div>
                <div className="col-6 mt-3">
                    <label>Lĩnh vực nghề nghiệp : </label>
                    <select
                        value={nhaTuyendungState.linhVucNgheNghiep}
                        name="linhVucNgheNghiep"
                        onChange={handleChange}
                    >
                        {nhaTuyendungState.LinhVucNgheNghiepRender &&
                            nhaTuyendungState.LinhVucNgheNghiepRender.length > 0 &&
                            nhaTuyendungState.LinhVucNgheNghiepRender.map((item) => {
                                return (
                                    <option key={item.id} value={item.ten}>
                                        {item.ten}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="col-6 mt-3">
                    <label>Khu vực : </label>
                    <select onChange={handleChange} value={nhaTuyendungState.khuVuc} name="khuVuc">
                        {VungDuLieu &&
                            VungDuLieu.length > 0 &&
                            VungDuLieu.map((item) => {
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
                    <label>Quy mô : </label>
                    <select onChange={handleChange} value={nhaTuyendungState.quiMo} name="quiMo">
                        {nhaTuyendungState.QuyMoRende &&
                            nhaTuyendungState.QuyMoRende.length > 0 &&
                            nhaTuyendungState.QuyMoRende.map((item) => {
                                return (
                                    <option key={item.id} value={item.ten}>
                                        {item.ten}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <div className="col-12 mt-3">
                    <label htmlFor="muctie-nghe-nghiep">Giới thiệu : </label>
                    <textarea
                        value={nhaTuyendungState.gioiThieu}
                        name="gioiThieu"
                        onChange={handleChange}
                        id="muctie-nghe-nghiep"
                        type="text"
                        placeholder="Giới thiệu về doanh nghiệp của bạn..."
                    />
                </div>
                <div className="col-12 mt-4">
                    <button ref={ref} onClick={() => handleBuildData()} className="btn btn-primary">
                        Lưu thông tin
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
