import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { v4 as uuidv4 } from 'uuid';

import styles from './post.module.scss';
import Loading from '../../app/components/loading/loading';
import { Row, Col, Container } from 'react-bootstrap';
import {
    getAllBangCap,
    getAllKinhghiem,
    getAllLinhVucKinhDoanh,
    getAllLoaiHopDong,
    getAllMucLuong,
    getAllViTriMongMuon,
} from '../../services/siteServices';
import { GioiTinhYeuCau, provinces } from '../../data/data';
import Link from 'next/link';

const cx = classNames.bind(styles);

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function PostComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const [dataPost, setDataPost] = useState({
        titleLoading: 'Đang tải ảnh lên',

        isPublic: true,
        contentHTML: '',
        contentMarkDown: '',
        chucDanh: '',
        capBac: '',
        loaiHopDong: '',
        mucLuong: '',
        diaDiemLamViec: '',
        linhVucNgheNghiep: '',
        hanNopHoSo: '',
        soLuong: '',
        moTa: '',
        kinhNghiem: '',
        bangCap: '',
        yeuCauGioiTinh: '',
        yeuCauHoSo: '',
        emailNopHoSo: '',
        hotline: '',
        diaChiNopTrucTiep: '',
        // yeuCauTuyenDung: '',

        KinhNghiemRender: [],
        BangCapRender: [],
        CapBacRender: [],
        HopDongRender: [],
        MucLuongRender: [],
        LinhVucNgheNghiepRender: [],
    });

    useEffect(() => {
        const Fetch = async () => {
            const [ResKinhNghiem, ResBangCap, ResCapBac, ResHopDong, ResMucLuong, ResLinhVucLamViec] =
                await Promise.all([
                    getAllKinhghiem(),
                    getAllBangCap(),
                    getAllViTriMongMuon(),
                    getAllLoaiHopDong(),
                    getAllMucLuong(),
                    getAllLinhVucKinhDoanh(),
                ]);

            setDataPost((prev) => {
                return {
                    ...prev,
                    KinhNghiemRender: ResKinhNghiem.data,
                    BangCapRender: ResBangCap.data,
                    CapBacRender: ResCapBac.data,
                    HopDongRender: ResHopDong.data,
                    MucLuongRender: ResMucLuong.data,
                    LinhVucNgheNghiepRender: ResLinhVucLamViec.data,
                };
            });
        };

        Fetch();
    }, []);

    const HandleEditorStateChange = ({ html, text }) => {
        setDataPost((prev) => {
            return {
                ...prev,
                contentHTML: html,
                contentMarkDown: text,
            };
        });
    };

    const handleOnUploadImage = (file) => {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(file);

            resolve(url);
        });
    };

    const handleChangeState = (e) => {
        const { name, value } = e.target;
        setDataPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataBuild = {
            state: isPublic,
            contentHTML: contentHTML,
            contentMarkDown: contentMarkDown,
            chucDanh: chucDanh,
            capBac: capBac,
            loaiHopDong: loaiHopDong,
            mucLuong: mucLuong,
            diaDiemLamViec: diaDiemLamViec,
            linhVucNgheNghiep: linhVucNgheNghiep,
            hanNopHoSo: hanNopHoSo,
            soLuong: soLuong,
            moTa: moTa,
            kinhNghiem: kinhNghiem,
            bangCap: bangCap,
            yeuCauGioiTinh: yeuCauGioiTinh,
            yeuCauHoSo: yeuCauHoSo,
            emailNopHoSo: emailNopHoSo,
            hotline: hotline,
            diaChiNopTrucTiep: diaChiNopTrucTiep,
        };
    };

    console.log(dataPost);

    return (
        <div className={cx('wp')}>
            {isLoading && <Loading title={dataPost.titleLoading} />}
            <form onSubmit={handleSubmit}>
                <Container>
                    <Row className="my-4">
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Chế độ bài viết</label>
                            <select
                                className="form-control"
                                value={dataPost.isPublic}
                                onChange={handleChangeState}
                                name="isPublic"
                                required
                            >
                                <option value={null}>-- chọn chế độ --</option>
                                <option value={true}>-- Công khai --</option>
                                <option value={false}>-- Không công khai --</option>
                            </select>
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Cấp bậc ứng tuyển</label>
                            <select
                                onChange={handleChangeState}
                                name="capBac"
                                className="form-control"
                                value={dataPost.capBac}
                                required
                            >
                                <option value={null}>-- Cấp bậc bạn muốn ứng tuyển --</option>
                                {dataPost.CapBacRender &&
                                    dataPost.CapBacRender.length > 0 &&
                                    dataPost.CapBacRender.map((item) => (
                                        <option key={item.id} value={item.ten}>
                                            {item.ten}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Loại hợp đồng</label>
                            <select
                                onChange={handleChangeState}
                                name="loaiHopDong"
                                className="form-control"
                                value={dataPost.loaiHopDong}
                                required
                            >
                                <option value={null}>-- Loại hợp đồng --</option>
                                {dataPost.HopDongRender &&
                                    dataPost.HopDongRender.length > 0 &&
                                    dataPost.HopDongRender.map((item) => (
                                        <option key={item.id} value={item.ten}>
                                            {item.ten}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Mức lương làm việc</label>
                            <select
                                onChange={handleChangeState}
                                name="mucLuong"
                                className="form-control"
                                value={dataPost.mucLuong}
                                required
                            >
                                <option value={null}>-- Mức lương làm việc --</option>
                                {dataPost.MucLuongRender &&
                                    dataPost.MucLuongRender.length > 0 &&
                                    dataPost.MucLuongRender.map((item) => (
                                        <option key={item.id} value={item.ten}>
                                            {item.ten}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Địa điểm làm việc</label>
                            <select
                                onChange={handleChangeState}
                                name="diaDiemLamViec"
                                className="form-control"
                                value={dataPost.diaDiemLamViec}
                                required
                            >
                                {provinces &&
                                    provinces.length > 0 &&
                                    provinces.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Lĩnh vực nghề nghiệp</label>
                            <select
                                onChange={handleChangeState}
                                name="linhVucNgheNghiep"
                                className="form-control"
                                value={dataPost.linhVucNgheNghiep}
                                required
                            >
                                <option value={null}>-- Lĩnh vực nghề nghiệp --</option>
                                {dataPost.LinhVucNgheNghiepRender &&
                                    dataPost.LinhVucNgheNghiepRender.length > 0 &&
                                    dataPost.LinhVucNgheNghiepRender.map((item) => (
                                        <option key={item.id} value={item.ten}>
                                            {item.ten}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Hạn nộp hồ sơ</label>
                            <input
                                onChange={handleChangeState}
                                name="hanNopHoSo"
                                className="form-control"
                                type="date"
                                value={dataPost.hanNopHoSo}
                                required
                            />
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Số lượng tuyển dụng</label>
                            <input
                                className="form-control"
                                type="number"
                                placeholder="1 ( Tuyển 1 người )"
                                value={dataPost.soLuong}
                                onChange={handleChangeState}
                                name="soLuong"
                                required
                            />
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Yêu cầu hồ sơ</label>
                            <input
                                onChange={handleChangeState}
                                name="yeuCauHoSo"
                                className="form-control"
                                type="text"
                                value={dataPost.yeuCauHoSo}
                                placeholder="Nộp hồ sơ photo (Sơ yếu lý lịch, CMND/CCCD) tại quầy lễ tân hoặc ứng tuyển online"
                            />
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Email Nộp hồ sơ</label>
                            <input
                                onChange={handleChangeState}
                                name="emailNopHoSo"
                                className="form-control"
                                type="email"
                                value={dataPost.emailNopHoSo}
                                placeholder="nhatuyendung@gmail.com"
                                required
                            />
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Số điện thoại liên hệ</label>
                            <input
                                onChange={handleChangeState}
                                name="hotline"
                                className="form-control"
                                type="text"
                                value={dataPost.hotline}
                                placeholder="0123456"
                                required
                            />
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Địa chỉ nộp trực tiếp</label>
                            <input
                                onChange={handleChangeState}
                                name="diaChiNopTrucTiep"
                                className="form-control"
                                type="text"
                                value={dataPost.diaChiNopTrucTiep}
                                placeholder="ngõ x phường minh khai hà nội"
                                required
                            />
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Kinh nghiệm ứng tuyển</label>
                            <select
                                onChange={handleChangeState}
                                name="kinhNghiem"
                                className="form-control"
                                value={dataPost.kinhNghiem}
                            >
                                <option value={null}>-- Kinh nghiệm ứng tuyển --</option>
                                {dataPost.KinhNghiemRender &&
                                    dataPost.KinhNghiemRender.length > 0 &&
                                    dataPost.KinhNghiemRender.map((item) => {
                                        return (
                                            <option key={item.id} value={item.ten}>
                                                {item.ten}
                                            </option>
                                        );
                                    })}
                            </select>
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Bằng cấp ứng tuyển</label>
                            <select
                                onChange={handleChangeState}
                                name="bangCap"
                                className="form-control"
                                value={dataPost.bangCap}
                            >
                                <option value={null}>-- Bằng cấp ứng tuyển --</option>
                                {dataPost.BangCapRender &&
                                    dataPost.BangCapRender.length > 0 &&
                                    dataPost.BangCapRender.map((item) => {
                                        return (
                                            <option key={item.id} value={item.ten}>
                                                {item.ten}
                                            </option>
                                        );
                                    })}
                            </select>
                        </Col>
                        <Col sm={4} className="mt-2 mb-2">
                            <label className="my-2">Giới tính yêu cầu</label>
                            <select
                                onChange={handleChangeState}
                                name="yeuCauGioiTinh"
                                className="form-control"
                                value={dataPost.yeuCauGioiTinh}
                            >
                                {GioiTinhYeuCau &&
                                    GioiTinhYeuCau.length > 0 &&
                                    GioiTinhYeuCau.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                            </select>
                        </Col>
                        {/* <Col sm={4} className="mt-2 mb-2">
                        <label className="my-2">Yêu cầu nhà tuyển dụng</label>
                        <textarea className="form-control" placeholder="" type="text" value="" onChange="" />
                    </Col> */}
                        <Col sm={12} className={cx('mark-down', 'mt-2')}>
                            <label className="my-2">
                                {' '}
                                <strong> * Chúng tôi khuyến cáo bạn nên nhập đủ các trường mà chúng tôi đề xuất</strong>
                            </label>
                            <label className="my-2"> * Yêu cầu nhà tuyển dụng</label>
                            <label className="my-2"> * Chế độ phúc lợi</label>
                            <label className="my-2"> * Mô tả công việc</label>
                            <label className="my-2"> * Những mô tả khác nếu bạn muốn thêm vào</label>
                            <label className="my-2">
                                {' '}
                                * Nếu bạn là người mới viết bài hãy tham khảo bài mẫu của chúng tôi{' '}
                                <Link href="/">
                                    <strong>tại đây</strong>
                                </Link>
                            </label>
                            <MdEditor
                                style={{ height: '70vh' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={HandleEditorStateChange}
                                onImageUpload={handleOnUploadImage}
                            />
                        </Col>
                        <Col sm={12}>
                            <div className="my-3 mx-4">
                                <button className="btn btn-primary d-block ms-auto">Đăng bài tuyển dụng</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </form>
        </div>
    );
}
