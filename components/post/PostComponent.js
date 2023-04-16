import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import styles from './post.module.scss';
import Loading from '../../app/components/loading/loading';
import { Row, Col, Container } from 'react-bootstrap';
import {
    createNewPost,
    getAllBangCap,
    getAllKinhghiem,
    getAllLinhVucKinhDoanh,
    getAllNganhNghe,
    getAllLoaiHopDong,
    getAllMucLuong,
    getAllViTriMongMuon,
    getPostData,
    updatePostNhaTuyenDung,
    getAllDiaDiemLamViec,
} from '../../services/siteServices';
import { GioiTinhYeuCau, provinces } from '../../data/data';
import Link from 'next/link';
import { swalert } from '../../mixins/swal.mixin';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import convertTime from '../../app/@func/convertTime/convertTime';
import { Input } from 'antd';
const { TextArea } = Input;

const cx = classNames.bind(styles);

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function PostComponent() {
    const userData = useSelector((state) => state.user);

    const [isEdit, setIsEdit] = useState(false);

    const params = useRouter();

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
        yeuCauTuyenDung: '',

        KinhNghiemRender: [],
        BangCapRender: [],
        CapBacRender: [],
        HopDongRender: [],
        MucLuongRender: [],
        LinhVucNgheNghiepRender: [],
    });

    useEffect(() => {
        if (params.query?.type === 'edit' && params.query?.id) {
            setIsEdit(true);

            const fetch = async () => {
                const Res = await getPostData(params.query?.id);

                if (Res) {
                    setDataPost((prev) => {
                        return {
                            ...prev,
                            contentHTML: Res?.data?.contentHTML,
                            contentMarkDown: Res?.data?.contentMarkDown,
                            chucDanh: Res?.data?.chucDanh,
                            capBac: Res?.data?.capBac,
                            loaiHopDong: Res?.data?.loaiHopDong,
                            mucLuong: Res?.data?.mucLuong,
                            diaDiemLamViec: Res?.data?.diaDiemLamViec,
                            linhVucNgheNghiep: Res?.data?.linhVucNgheNghiep,
                            hanNopHoSo: Res?.data?.hanNopHoSo,
                            soLuong: Res?.data?.soLuong,
                            moTa: Res?.data?.moTa,
                            kinhNghiem: Res?.data?.kinhNghiem,
                            bangCap: Res?.data?.bangCap,
                            yeuCauGioiTinh: Res?.data?.yeuCauGioiTinh,
                            yeuCauHoSo: Res?.data?.yeuCauHoSo,
                            emailNopHoSo: Res?.data?.emailNopHoSo,
                            hotline: Res?.data?.hotline,
                            diaChiNopTrucTiep: Res?.data?.diaChiNopTrucTiep,
                            yeuCauTuyenDung: Res?.data?.yeuCauTuyenDung,
                        };
                    });
                }
            };

            fetch();
        }
    }, [params]);

    useEffect(() => {
        const Fetch = async () => {
            const [ResKinhNghiem, ResBangCap, ResCapBac, ResHopDong, ResMucLuong, ResLinhVucLamViec, ResDiaDiemLamViec] =
                await Promise.all([
                    getAllKinhghiem(),
                    getAllBangCap(),
                    getAllViTriMongMuon(),
                    getAllLoaiHopDong(),
                    getAllMucLuong(),
                    getAllNganhNghe(),
                    getAllDiaDiemLamViec()
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
                    DiaDiemLamViecRender: ResDiaDiemLamViec.data
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

    const handleResetState = () => {
        setDataPost((prev) => {
            return {
                ...prev,
                titleLoading: 'Đang tải dữ liệu',

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
                kinhNghiem: '',
                bangCap: '',
                yeuCauGioiTinh: '',
                yeuCauHoSo: '',
                emailNopHoSo: '',
                hotline: '',
                diaChiNopTrucTiep: '',
                yeuCauTuyenDung: '',
                moTa: ""
            };
        });
    };

    useEffect(() => {
        if (!params.query?.type) {
            handleResetState();
            setIsEdit(false);
        }
    }, [params]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            isPublic,
            contentHTML,
            contentMarkDown,
            chucDanh,
            capBac,
            loaiHopDong,
            mucLuong,
            diaDiemLamViec,
            linhVucNgheNghiep,
            hanNopHoSo,
            soLuong,
            moTa,
            kinhNghiem,
            bangCap,
            yeuCauGioiTinh,
            yeuCauHoSo,
            emailNopHoSo,
            hotline,
            diaChiNopTrucTiep,
            yeuCauTuyenDung,
        } = dataPost;

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
            yeuCauTuyenDung: yeuCauTuyenDung,
            emailCty: userData?.userInfo?.email,
        };

        try {
            console.log(isEdit);

            setIsLoading(true);
            setDataPost((prev) => {
                return {
                    ...prev,
                    titleLoading: 'Đang tải dữ liệu của bạn lên server!',
                };
            });

            isEdit ? await updatePostNhaTuyenDung(params.query?.id, dataBuild) : await createNewPost(dataBuild);

            setIsLoading(false);

            swalert
                .fire({
                    title: 'Chúc mừng',
                    icon: 'success',
                    text: isEdit ? 'Bạn đã sửa bài viết thành công!' : 'Bạn đã tạo bài viết thành công!',
                    showCloseButton: true,
                    showCancelButton: false,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        handleResetState();
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuildDate = (date) => {
        let text = convertTime(date);

        let arr = text
            .split('/')
            .reverse()
            .map((num) => num.toString().padStart(2, '0'));

        text = arr.join('-');

        console.log(text);

        return text;
    };

    return (
        <div className={cx('wp')}>
            {isLoading && <Loading title={dataPost.titleLoading} />}
            <form onSubmit={handleSubmit}>
                <Container>
                    <h6 className='text-center text-uppercase heading-in-create-job-page mt-3'>Thông tin công việc</h6>
                    <Row className="my-1">
                        <Col sm={8}>
                            <Row>
                                <Col sm={6} className="mt-2 mb-2">
                                    <label className="my-2">Chức danh</label>
                                    <input
                                        onChange={handleChangeState}
                                        name="chucDanh"
                                        className="form-control"
                                        placeholder="Nhân Viên Văn Phòng Hành Chính"
                                        type="text"
                                        value={dataPost.chucDanh}
                                        required
                                    />
                                </Col>
                                <Col sm={6} className="mt-2 mb-2">
                                    <label className="my-2">Cấp bậc ứng tuyển</label>
                                    <select
                                        onChange={handleChangeState}
                                        name="capBac"
                                        className="form-control"
                                        value={dataPost.capBac}
                                        required
                                    >
                                        <option value={null}>-- Cấp bậc bạn cần tuyển dụng --</option>
                                        {dataPost.CapBacRender &&
                                            dataPost.CapBacRender.length > 0 &&
                                            dataPost.CapBacRender.map((item) => (
                                                <option key={item.id} value={item.ten}>
                                                    {item.ten}
                                                </option>
                                            ))}
                                    </select>
                                </Col>
                                <Col sm={6} className="mt-2 mb-2">
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
                                <Col sm={6} className="mt-2 mb-2">
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
                                <Col sm={6} className="mt-2 mb-2">
                                    <label className="my-2">Địa điểm làm việc</label>
                                    <select
                                        onChange={handleChangeState}
                                        name="diaDiemLamViec"
                                        className="form-control"
                                        value={dataPost.diaDiemLamViec}
                                        required
                                    >
                                        <option value={null}>-- Địa điểm làm việc --</option>
                                        {dataPost.DiaDiemLamViecRender &&
                                            dataPost.DiaDiemLamViecRender.length > 0 &&
                                            dataPost.DiaDiemLamViecRender.map((item) => (
                                                <option key={item.id} value={item.ten}>
                                                    {item.ten}
                                                </option>
                                            ))}
                                    </select>
                                </Col>
                                <Col sm={6} className="mt-2 mb-2">
                                    <label className="my-2">Ngành nghề</label>
                                    <select
                                        onChange={handleChangeState}
                                        name="linhVucNgheNghiep"
                                        className="form-control"
                                        value={dataPost.linhVucNgheNghiep}
                                        required
                                    >
                                        <option value={null}>-- Chọn ngành nghề --</option>
                                        {dataPost.LinhVucNgheNghiepRender &&
                                            dataPost.LinhVucNgheNghiepRender.length > 0 &&
                                            dataPost.LinhVucNgheNghiepRender.map((item) => (
                                                <option key={item.id} value={item.ten}>
                                                    {item.ten}
                                                </option>
                                            ))}
                                    </select>
                                </Col>
                                <Col sm={6} className="mt-2 mb-2">
                                    <label className="my-2">Hạn nộp hồ sơ</label>
                                    <input
                                        onChange={handleChangeState}
                                        name="hanNopHoSo"
                                        className="form-control"
                                        type="date"
                                        value={isEdit ? handleBuildDate(dataPost.hanNopHoSo) : dataPost.hanNopHoSo}
                                        // value={'2023-4-5'}
                                        required
                                    />
                                </Col>
                                <Col sm={6} className="mt-2 mb-2">
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
                            </Row>
                        </Col>
                        <Col sm={4}>
                            <Col sm={12} className="mt-2 mb-2">
                                <label className="my-2">Kinh nghiệm ứng tuyển</label>
                                <select
                                    onChange={handleChangeState}
                                    name="kinhNghiem"
                                    className="form-control"
                                    value={dataPost.kinhNghiem}
                                >
                                    <option value={null}>-- Kinh nghiệm --</option>
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
                            <Col sm={12} className="mt-2 mb-2">
                                <label className="my-2">Mô tả công việc</label>
                                <TextArea
                                    onChange={handleChangeState}
                                    name="des"
                                    className="form-control"
                                    type="text"
                                    value={dataPost.moTa}
                                    placeholder="Mô tả công việc"
                                    required
                                    maxLength={200}
                                    style={{
                                        height: 232
                                    }}
                                />
                            </Col>
                        </Col>
                        {/* <Col sm={4} className="mt-2 mb-2">
                        <label className="my-2">Yêu cầu nhà tuyển dụng</label>
                        <textarea className="form-control" placeholder="" type="text" value="" onChange="" />
                    </Col> */}

                    </Row>
                    <Row>
                        <h6 className='text-center text-uppercase heading-in-create-job-page mt-3'>Thông tin liên hệ</h6>
                        <Col sm={4} className="mt-1 mb-2">
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
                            <label className="my-2">Địa chỉ nộp trực tiếp</label>
                            <input
                                onChange={handleChangeState}
                                name="diaChiNopTrucTiep"
                                className="form-control"
                                type="text"
                                value={dataPost.diaChiNopTrucTiep}
                                placeholder="Địa chỉ nộp hồ sơ"
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
                    </Row>
                    <Row className="">
                        <h6 className='text-center text-uppercase heading-in-create-job-page mt-3'>Thông tin yêu cầu</h6>
                        <Col sm={8}>
                            <Row>
                                <Col sm={6} className="mt-2 mb-2">
                                    <label className="my-2">Yêu cầu hồ sơ</label>
                                    <TextArea
                                        onChange={handleChangeState}
                                        name="yeuCauHoSo"
                                        className="form-control"
                                        type="text"
                                        value={dataPost.yeuCauHoSo}
                                        style={{
                                            height: 124,
                                        }}
                                        placeholder="Nộp hồ sơ photo (Sơ yếu lý lịch, CMND/CCCD) tại quầy lễ tân hoặc ứng tuyển online"
                                    />
                                </Col>
                                <Col sm={6} className="mt-2 mb-2">
                                    <label className="my-2">Yêu cầu về ứng viên</label>
                                    <TextArea
                                        onChange={handleChangeState}
                                        name="yeuCauTuyenDung"
                                        className="form-control"
                                        type="text"
                                        value={dataPost.yeuCauTuyenDung}
                                        style={{
                                            height: 124,
                                        }}
                                        placeholder="Yêu cầu về ứng viên của bạn"
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={4}>
                            <Col sm={12} className="mt-2 mb-2">
                                <label className="my-2">Bằng cấp ứng tuyển</label>
                                <select
                                    onChange={handleChangeState}
                                    name="bangCap"
                                    className="form-control"
                                    value={dataPost.bangCap}
                                >
                                    <option value={null}>-- Yêu cầu bằng cấp --</option>
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
                            <Col sm={12} className="mt-2 mb-2">
                                <label className="my-2">Yêu cầu giới tính</label>
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
                        </Col>
                    </Row>
                    <Row>
                        <h6 className='text-center text-uppercase heading-in-create-job-page mt-3'>Chế độ phúc lợi</h6>
                        <Col sm={12} className={cx('mark-down', 'mt-2')}>
                            <label className="my-2">
                                <strong> * Chúng tôi khuyến cáo bạn nên nhập đủ các trường mà chúng tôi đề xuất</strong>
                            </label>
                            <label className="my-2"> * Chế độ phúc lợi</label>
                            <label className="my-2"> * Những mô tả khác nếu bạn muốn thêm vào</label>
                            <MdEditor
                                style={{ height: '70vh' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={HandleEditorStateChange}
                                onImageUpload={handleOnUploadImage}
                                value={isEdit ? dataPost.contentMarkDown : dataPost.contentMarkDown}
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
