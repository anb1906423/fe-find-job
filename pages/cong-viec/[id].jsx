import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { Modal } from 'antd';
import { DollarCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
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
    FaEdit,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { swalert } from '../../mixins/swal.mixin';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { LayThongTinUngVien } from '../../services/siteServices';
import { sendDataUngTuyen } from '../../services/ungTuyenServices';
import Loading from '../../app/components/loading/loading';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ChiTietCongViec = (props) => {
    function convertTime(timeString) {
        const date = new Date(timeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    }

    // config ung vien submit ung tuyen
    const role = useSelector((state) => state.user.role);
    const userInfo = useSelector((state) => state.user.userInfo);
    const router = useRouter();

    const [contentMarkDown, setContentMarkDown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const HandleEditorStateChange = ({ html, text }) => {
        setContentMarkDown(text);
        setContentHTML(html);
    };

    const handleOnUploadImage = (file) => {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(file);

            resolve(url);
        });
    };

    const handleShowModelUngTuyen = () => {
        if (role || role === 0) {
            if (role !== -1) {
                swalert.fire({
                    title: 'Bạn không phải là ứng viên',
                    icon: 'warning',
                    text: 'Vui lòng đăng nhập ứng viên!',
                    showCloseButton: true,
                    showCancelButton: true,
                });

                return;
            }

            setIsOpenModel(true);
        } else {
            router.push('/dang-nhap/ung-vien');
        }
    };

    const handleSubmitHoSo = async () => {
        if (!_.isEmpty(userInfo)) {
            const idUser = userInfo?.id;

            if (idUser) {
                try {
                    const Res = await LayThongTinUngVien(idUser);

                    console.log(Res?.data);
                    if (Res && Res?.data) {
                        const data = Res?.data || {};

                        const dataBuil = {
                            idUngVien: data.id,
                            idNhaTuyenDung: props.id,
                            time: new Date().getTime(),
                            emailNhaTuyenDung: props.emailNopHoSo || data.emailCty,
                            emailUngVien: data.email || 'Đang cập nhật',
                            hoVaTen: data.hoVaTen || 'Đang cập nhật',
                            diaChi: data.diaChi || 'Đang cập nhật',
                            soDienThoai: data.soDienThoai || 'Đang cập nhật',
                            markDown: contentHTML || '',
                        };

                        setIsLoading(true);

                        const ResSubmit = await sendDataUngTuyen(dataBuil);

                        setIsLoading(false);

                        if (ResSubmit && ResSubmit.errCode === 0) {
                            swalert
                                .fire({
                                    title: 'Thành công',
                                    icon: 'success',
                                    text: ResSubmit.msg,
                                    showCloseButton: true,
                                    showCancelButton: false,
                                })
                                .then(async (result) => {
                                    if (result.isConfirmed) {
                                        setIsOpenModel(false);
                                        setContentMarkDown('');
                                        setContentHTML('');
                                    }
                                });
                        } else {
                            swalert
                                .fire({
                                    title: 'Có lỗi xảy ra',
                                    icon: 'warning',
                                    text: ResSubmit.msg,
                                    showCloseButton: true,
                                    showCancelButton: false,
                                })
                                .then(async (result) => {
                                    if (result.isConfirmed) {
                                        setIsOpenModel(false);
                                        setContentMarkDown('');
                                        setContentHTML('');
                                    }
                                });
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    return (
        <>
            {isLoading && <Loading title="Đang gửi thông tin của bạn tới nhà tuyển dụng!" />}
            <Modal
                open={props.isOpen}
                onCancel={() => props.setIsOpen(false)}
                width={1020}
                footer={null}
                style={{
                    top: 0,
                }}
            >
                <div className="job-detail-wrapp">
                    <Modal
                        open={isOpenModel}
                        width={'45vw'}
                        onCancel={() => setIsOpenModel(false)}
                        footer={
                            <div>
                                <button onClick={handleSubmitHoSo} className="btn btn-primary my-1">
                                    Nộp hồ sơ
                                </button>
                            </div>
                        }
                        style={{
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <div>
                            <h6 className="my-2">
                                Bạn đang thực hiện ứng tuyển vào công ty <strong>{props.tenCty}</strong>
                            </h6>
                            <p className="my-3">
                                Chúng tôi xin chúc bạn sớm nhận được thông tin ứng tuyển từ nhà tuyển dụng!
                            </p>
                            <div>
                                <label className="my-1 fw-bold">Đôi lời nhắn gửi nhà tuyển dụng (nếu có)</label>
                                <MdEditor
                                    style={{ height: '36vh' }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={HandleEditorStateChange}
                                    onImageUpload={handleOnUploadImage}
                                    value={contentMarkDown}
                                />
                            </div>
                        </div>
                    </Modal>
                    <div className="job-detail-header position-relative">
                        <div className="row">
                            <div className="col-2 d-flex justify-content-center align-items-center">
                                <img
                                    src={
                                        props.logoCty ||
                                        'https://thumbs.dreamstime.com/b/vintage-rusty-metal-sign-white-background-hiring-hiring-98774212.jpg'
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="col-8">
                                <h6 className="text-uppercase chuc-danh mt-1">{props.chucDanh}</h6>
                                <h6 className="mt-1">{props.tenCty}</h6>
                                <h6 className="mt-1 dia-chi">{props.diaChi}</h6>
                                <div className="d-flex row">
                                    <p className="d-flex align-items-center col-6 mt-1">
                                        <DollarCircleOutlined />
                                        <p>
                                            <strong>Mức lương: </strong>
                                            {props.mucLuongMongMuon}
                                        </p>
                                    </p>
                                    <p className="d-flex align-items-center col-6 mt-1">
                                        <ClockCircleOutlined />
                                        <p>
                                            <strong>Hạn nộp hồ sơ: </strong>
                                            {convertTime(props.hanNopHoSo)}
                                        </p>
                                    </p>
                                </div>
                            </div>
                            <div className="col-2">
                                <button className="apply-btn" onClick={() => handleShowModelUngTuyen()}>
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
                                            <p className="">
                                                <strong>Kinh nghiệm:</strong>&nbsp;{props.kinhNghiem}
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center content-item">
                                            <FaAddressCard />
                                            <p className="">
                                                <strong>Yêu cầu bằng cấp:</strong>&nbsp;{props.bangCap}
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center content-item">
                                            <FaUserFriends />
                                            <p className="">
                                                <strong>Số lượng cần tuyển:</strong>&nbsp;{props.soLuong}
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center content-item">
                                            <FaIndent />
                                            <p className="">
                                                <strong>Ngành nghề:</strong>&nbsp;{props.linhVucNgheNghiep}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center content-item">
                                            <FaUsersCog />
                                            <p className="">
                                                <strong>Chức vụ:</strong>&nbsp;{props.capBac}
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center content-item">
                                            <FaVenusMars />
                                            <p className="">
                                                <strong>Yêu cầu giới tính:</strong>&nbsp;{props.yeuCauGioiTinh}
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center content-item">
                                            <FaIdCardAlt />
                                            <p className="">
                                                <strong>Hình thức làm việc:</strong>&nbsp;{props.loaiHopDong}
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center content-item">
                                            <FaMapMarkerAlt />
                                            <p className="">
                                                <strong>Địa điểm làm việc:</strong>&nbsp;{props.diaDiemLamViec}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="re-line job-des-wrap box-content">
                                        <HeadingInDetailJob title="Mô tả công việc" />
                                        <div className="job-des">{props.moTa}</div>
                                    </div>
                                    <div className="re-line job-require-wrap box-content">
                                        <HeadingInDetailJob title="Yêu cầu công việc" />
                                        <div className="job-des">{props.yeuCauTuyenDung}</div>
                                    </div>
                                    <div className="job-benefit-wrap box-content">
                                        <HeadingInDetailJob title="Quyền lợi được hưởng" />
                                        <div className="job-des re-line">{props.contentMarkDown}</div>
                                    </div>
                                    <div className="job-require-file-wrap box-content">
                                        <HeadingInDetailJob title="Yêu cầu hồ sơ" />
                                        <div className="re-line job-des">{props.yeuCauHoSo}</div>
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
                                                <p>Địa chỉ nộp: {props.diaChiNopTrucTiep}</p>
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
        </>
    );
};

export default ChiTietCongViec;
