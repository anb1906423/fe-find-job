import React, { useState } from 'react'
import { Modal } from 'antd';
import { DollarCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import HeadingInDetailJob from '../../components/HeadingInDetailJob';
import {
    FaBusinessTime,
    FaAddressCard,
    FaUserFriends,
    FaIndent,
    FaUsersCog,
    FaVenusMars,
    FaIdCardAlt,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaChrome,
    FaEdit
} from 'react-icons/fa'

const ChiTietCongViec = (props) => {

    function convertTime(timeString) {
        const date = new Date(timeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    }

    return (
        <Modal
            open={props.isOpen}
            onCancel={() => props.setIsOpen(false)}
            width={1020}
            footer={null}
            style={{
                top: 0,
            }}
        >
            <div className='job-detail-wrapp'>
                <div className="job-detail-header position-relative">
                    <div className="row">
                        <div className="col-2 d-flex justify-content-center align-items-center">
                            <img src={props.logoCty || "https://thumbs.dreamstime.com/b/vintage-rusty-metal-sign-white-background-hiring-hiring-98774212.jpg"} alt="" />
                        </div>
                        <div className="col-8">
                            <h6 className="text-uppercase chuc-danh mt-1">
                                {props.chucDanh}
                            </h6>
                            <h6 className="mt-1">
                                {props.tenCty}
                            </h6>
                            <h6 className='mt-1 dia-chi'>
                                {props.diaChi}
                            </h6>
                            <div className="d-flex row">
                                <p className='d-flex align-items-center col-6 mt-1'>
                                    <DollarCircleOutlined />
                                    <p><strong>Mức lương: </strong>
                                        {props.mucLuongMongMuon}
                                    </p>
                                </p>
                                <p className='d-flex align-items-center col-6 mt-1'>
                                    <ClockCircleOutlined />
                                    <p><strong>Hạn nộp hồ sơ: </strong>
                                        {convertTime(props.hanNopHoSo)}
                                    </p>
                                </p>
                            </div>
                        </div>
                        <div className="col-2">
                            <button className="apply-btn">
                                Nộp hồ sơ
                            </button>
                        </div>
                    </div>
                </div>
                <div className="job-detail-body">
                    <div className="row">
                        <div className="col-8 left-body position-relative">
                            <div className="row box-content">
                                <div className="col-6">
                                    <div className="d-flex align-items-center content-item">
                                        <FaBusinessTime />
                                        <p className=""><strong>Kinh nghiệm:</strong>&nbsp;{props.kinhNghiem}</p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaAddressCard />
                                        <p className=""><strong>Yêu cầu bằng cấp:</strong>&nbsp;{props.bangCap}</p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaUserFriends />
                                        <p className=""><strong>Số lượng cần tuyển:</strong>&nbsp;{props.soLuong}</p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaIndent />
                                        <p className=""><strong>Ngành nghề:</strong>&nbsp;{props.linhVucNgheNghiep}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center content-item">
                                        <FaUsersCog />
                                        <p className=""><strong>Chức vụ:</strong>&nbsp;{props.capBac}</p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaVenusMars />
                                        <p className=""><strong>Yêu cầu giới tính:</strong>&nbsp;{props.yeuCauGioiTinh}</p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaIdCardAlt />
                                        <p className=""><strong>Hình thức làm việc:</strong>&nbsp;{props.loaiHopDong}</p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaMapMarkerAlt />
                                        <p className=""><strong>Địa điểm làm việc:</strong>&nbsp;{props.diaDiemLamViec}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='re-line job-des-wrap box-content'>
                                    <HeadingInDetailJob title="Mô tả công việc" />
                                    <div className='job-des'>
                                        {props.moTa}
                                    </div>
                                </div>
                                <div className='re-line job-require-wrap box-content'>
                                    <HeadingInDetailJob title="Yêu cầu công việc" />
                                    <div className='job-des'>
                                        {props.yeuCauTuyenDung}
                                    </div>
                                </div>
                                <div className='job-benefit-wrap box-content'>
                                    <HeadingInDetailJob title="Quyền lợi được hưởng" />
                                    <div className='job-des re-line'>
                                        {props.contentMarkDown}
                                    </div>
                                </div>
                                <div className='job-require-file-wrap box-content'>
                                    <HeadingInDetailJob title="Yêu cầu hồ sơ" />
                                    <div className='re-line job-des'>
                                        {props.yeuCauHoSo}
                                    </div>
                                </div>
                                <div className='job-contact-info-wrap box-content'>
                                    <HeadingInDetailJob title="Thông tin liên hệ" />
                                    <div className='job-des'>
                                        <div className='d-flex align-items-center content-item'>
                                            <FaMapMarkerAlt />
                                            <p><strong>Địa chỉ: </strong>{props.diaChi}</p>
                                        </div>
                                        <div className='d-flex align-items-center content-item'>
                                            <FaPhoneAlt />
                                            <p>
                                                <strong>Số điện thoại:&nbsp; </strong>
                                                <a href={`tel:${props.soDienThoai}`}>
                                                    {props.soDienThoai}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='job-contact-info-wrap box-content'>
                                    <HeadingInDetailJob title="Cách nộp hồ sơ" />
                                    <div className='job-des'>
                                        <div className='to-apply'>
                                            <strong className='content-item'>Cách 1: Nộp trực tiếp tại văn phòng</strong>
                                            <div className='d-flex align-items-center content-item'>
                                                <p>Địa chỉ nộp: {props.diaChi}</p>
                                            </div>
                                        </div>
                                        <div className='to-apply'>
                                            <strong className='content-item'>Cách 2: Nộp hồ sơ qua email
                                                <button className="apply-btn" style={{ marginLeft: "16px" }}>
                                                    Nộp hồ sơ
                                                </button>
                                            </strong>
                                            <div className='d-flex align-items-center content-item'>
                                                <p>Bấm vào nút "NỘP HỒ SƠ" để gửi hồ sơ đến nhà tuyển dụng</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        * Hạn nộp: <strong className="text-danger">
                                            {convertTime(props.hanNopHoSo)}
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 right-body">
                            <div className='right-body-item'>
                                <h6 className="heading text-uppercase text-center">
                                    thông tin công ty
                                </h6>
                                <div className='d-flex align-items-center content-item'>
                                    <FaMapMarkerAlt />
                                    <p>{props.diaChi}</p>
                                </div>
                                <div className='d-flex align-items-center content-item'>
                                    <FaPhoneAlt />
                                    <p>
                                        <a href={`tel:${props.soDienThoai}`}>
                                            {props.soDienThoai}
                                        </a>
                                    </p>
                                </div>
                                <div className='d-flex align-items-center content-item'>
                                    <FaChrome />
                                    <a target="_blank" href={props.website}>
                                        <p>{props.website}</p>
                                    </a>
                                </div>
                                <div className='d-flex align-items-center content-item'>
                                    <FaEdit />
                                    <a href="">
                                        <p>Xem chi tiết công ty</p>
                                    </a>
                                </div>
                            </div>
                            <div className='right-body-item'>
                                <h6 className="heading text-uppercase text-center">
                                    Việc làm cùng công ty
                                </h6>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ChiTietCongViec