import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FaChrome, FaEdit, FaMapMarkerAlt, FaPhoneAlt, FaMapMarkedAlt } from 'react-icons/fa';
import { Col, Row } from 'react-bootstrap';

import style from '../../components/UngTuyenComponent/ungtuyen.module.scss';

import Loading from '../../app/components/loading/loading';
import axios from 'axios';
import { backendAPI } from '../../config';
import {
    TeamOutlined,
    CreditCardFilled,
    SlidersFilled,
    ReconciliationFilled,
    DollarCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import ChiTietCongViec from '../cong-viec/[id]';

const cx = classNames.bind(style);
import OtherJobsBox from '../../components/jobDetail/OtherJobsBox';

function convertTime(timeString) {
    const date = new Date(timeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
}

export default function NhaTuyenDungUngTuyenManage({ danhSachNTD, nhaTuyenDung }) {

    const router = useRouter();

    const idNTD = router.query.id;
    // const { idNTD } = useParams();
    // data nha tuyen dung
    const [dataNTD, setDataNTD] = useState([]);
    // const [nhaTuyenDung, setNhaTuyenDung] = useState([])

    // data of list ung tuyem
    const [isLoading, setIsLoading] = useState(false);
    const [otherJobList, setOtherJobList] = useState([])

    const [isOpen, setIsOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const handleItemClick = (jobId) => {
        setSelectedJobId(jobId);
    };

    const showModal = () => {
        setIsOpen(true);
        // router.push(`/cong-viec/${props.id}`);
    };

    const endDate = new Date();

    // useEffect(() => {
    //     // So sánh thời gian hiện tại với hạn nộp hồ sơ
    //     if (endDate.toISOString() > props.hanNopHoSo) {
    //         setIsButtonDisabled(true);
    //     }
    // }, []);

    useEffect(() => {
        danhSachNTD && danhSachNTD.map((item) => {
            if (item.id == idNTD) {
                setDataNTD(item)
            }
        })

    }, [idNTD])

    useEffect(() => {
        const getOtherJobList = async () => {
            try {
                const response = await axios.get(backendAPI +
                    `/cong-viec/bai-dang-cong-ty?emailcty=${dataNTD.email}`
                );
                setOtherJobList(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (dataNTD.email) {
            getOtherJobList();
        }
    }, [dataNTD.email]);

    return (
        <>
            <div className={cx('wp')}>
                {isLoading && <Loading />}
                <Row>
                    <Col md={9} style={{ borderRight: "1px solid #ccc" }}>
                        <div className="left-section">
                            <div className={cx('congty')}>
                                <div
                                    style={{
                                        backgroundImage: `url(${dataNTD?.banner
                                            ? dataNTD?.banner
                                            : 'https://img.freepik.com/free-photo/flat-lay-office-desk-assortment-with-copy-space_23-2148707962.jpg'
                                            })`,
                                    }}
                                    className={cx('banner')}
                                ></div>
                                <div
                                    className={cx('avatar')}
                                    style={{
                                        backgroundImage: `url(${dataNTD?.logoCty ? dataNTD?.logoCty : '../img/no-avatar.jpg'})`,
                                    }}
                                >
                                </div>
                            </div>
                            <div className={cx('body-content')}>
                                <div
                                    className={cx("company-name fw-bold")}
                                >
                                    <h5
                                        style={{
                                            fontSize: "24px",
                                            marginBottom: "12px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {dataNTD.tenCty}
                                    </h5>
                                </div>
                                <div>
                                    <h6>Việc làm đang tuyển dụng</h6>
                                    <div>
                                        {
                                            otherJobList &&
                                            otherJobList.map((item, index) => {
                                                const isOpen = item.id === selectedJobId;
                                                
                                                return (
                                                    <div className="hiring-jobs" key={index}>
                                                        {/* <ChiTietCongViec
                                                            setIsOpen={setIsOpen}
                                                            isButtonDisabled={isButtonDisabled}
                                                            isOpen={isOpen}
                                                            {...item}
                                                            tenCty={item.tenCongty}
                                                        /> */}

                                                        <div className="row">
                                                            <div className="col-12 info-box">
                                                                <div onClick={() => handleItemClick(item.id)}>
                                                                    <div className="">
                                                                        <h6 className="text-uppercase chuc-danh">{item.chucDanh}</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex row">
                                                                    <p className="d-flex align-items-center col-4 mb-0">
                                                                        <DollarCircleOutlined />
                                                                        <span>{item.mucLuong}</span>
                                                                    </p>
                                                                    <p className="d-flex align-items-center col-4 mb-0">
                                                                        <FaMapMarkerAlt />
                                                                        <span>{item.diaDiemLamViec}</span>
                                                                    </p>
                                                                    <p className="d-flex align-items-center col-4 mb-0">
                                                                        <ClockCircleOutlined />
                                                                        <span>{convertTime(item.created_at)}</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                                <div style={{
                                    whiteSpace: "pre-line",
                                    marginTop: "32px"
                                }} className="gioi-thieu-box">
                                    <h6>Giới thiệu công ty</h6>
                                    {dataNTD.gioiThieu}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="right-body-item">
                            <h6 className="heading text-uppercase text-center">thông tin công ty</h6>
                            <div className="d-flex align-items-center content-item gap-3 mb-2">
                                <FaMapMarkerAlt />
                                <p className="p-0 m-0">{dataNTD.diaChi}</p>
                            </div>
                            <div className="d-flex align-items-center content-item gap-3 mb-2">
                                <FaPhoneAlt />
                                <p className="p-0 m-0">
                                    <a className="text-decoration-none" href={`tel:${dataNTD.soDienThoai}`}>
                                        {dataNTD.soDienThoai}
                                    </a>
                                </p>
                            </div>
                            <div className="d-flex align-items-center content-item gap-3 mb-2">
                                <FaChrome />
                                <a className="text-decoration-none" target="_blank" href={dataNTD.website}>
                                    <p className="p-0 m-0">{dataNTD.website || 'Đang cập nhật'}</p>
                                </a>
                            </div>
                            <div className="d-flex align-items-center content-item gap-3 mb-2">
                                <FaMapMarkedAlt />
                                <p className="p-0 m-0">{dataNTD.khuVuc || 'Đang cập nhật'}</p>
                            </div>
                            <div className="d-flex align-items-center content-item gap-3 mb-2">
                                <TeamOutlined />
                                <p className="p-0 m-0">{'Quy mô: ' + (dataNTD.quiMo || 'Đang cập nhật')}</p>
                            </div>
                            <div className="d-flex align-items-center content-item gap-3 mb-2">
                                <CreditCardFilled />
                                <p className="p-0 m-0">{'MST: ' + dataNTD.maSoThue}</p>
                            </div>
                            <div className="d-flex align-items-center content-item gap-3 mb-2">
                                <SlidersFilled />
                                <p className="p-0 m-0">{'Loại hình: ' + (dataNTD.loaiHinhDoanhNghiep || 'Đang cập nhật')}</p>
                            </div>
                            <div className="d-flex align-items-center content-item gap-3 mb-2">
                                <ReconciliationFilled />
                                <p className="p-0 m-0">{'Lĩnh vực: ' + (dataNTD.linhVucNgheNghiep || 'Đang cập nhật')}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}


export async function getStaticPaths() {
    const Res = await axios.get(`${backendAPI}/nha-tuyen-dung?page=${1}&limit=${100}`);

    const path = Res?.data.map((x) => ({
        params: {
            id: x?.id,
        },
    }));

    return {
        paths: path,
        fallback: true, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const { id } = params;

    try {
        const res = await fetch(`${backendAPI}/nha-tuyen-dung/${id}`);
        // const car = await res.json();

        const res2 = await fetch(backendAPI + '/nha-tuyen-dung');
        const result = await res2.json();

        const nhaTuyenDung = result.filter((item) => item.id == id);
        const danhSachNTD = result

        return {
            props: {
                danhSachNTD,
                nhaTuyenDung,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }
}