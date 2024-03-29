import React, { useState, useEffect } from 'react';
import { DollarCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import ChiTietCongViec from '../pages/cong-viec/[id]';
import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router';
import { swtoast } from '../mixins/swal.mixin';

function tinhThoiGianDaQua(startDate, endDate) {
    const diffInMs = new Date(endDate) - new Date(startDate);
    const diffInHours = diffInMs / 3600000;

    if (diffInHours >= 24) {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} ngày`;
    } else {
        return `${Math.floor(diffInHours)} giờ`;
    }
}

const CongViecComponent = (props) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const showModal = () => {
        setIsOpen(true);
        // router.push(`/cong-viec/${props.id}`);
    };

    const endDate = new Date();

    useEffect(() => {
        // So sánh thời gian hiện tại với hạn nộp hồ sơ
        if (endDate.toISOString() > props.hanNopHoSo) {
            setIsButtonDisabled(true);
        }
    }, []);

    const { capBac, loaiHopDong, kinhNghiem, bangCap } = props;


    return (
        <div className={`col-${props.col} cong-viec-component gx-3`}>
            <ChiTietCongViec
                setIsOpen={setIsOpen}
                isButtonDisabled={isButtonDisabled}
                isOpen={isOpen}
                {...props}
                tenCty={props.tenCongty}
            />

            <div className="row">
                <div onClick={() => showModal()} className="col-3 image-box d-flex justify-content-center align-items-center">
                    {/* <Link href={`/cong-viec/${props.id}`}> */}
                    <div className="pointer">
                        <img
                            src={
                                props.logoCty ||
                                'https://thumbs.dreamstime.com/b/vintage-rusty-metal-sign-white-background-hiring-hiring-98774212.jpg'
                            }
                            alt="Logo công ty"
                        />
                    </div>
                    {/* </Link> */}
                </div>
                <div className="col-9 info-box">
                    <div>
                        {/* <Link href={`/cong-viec/${props.id}`}> */}
                        <div onClick={() => showModal()} className="pointer">
                            <h6 className="text-uppercase chuc-danh">{props.chucDanh}</h6>
                        </div>
                        {/* </Link> */}
                    </div>
                    <div>
                        <Link href={`/chi-tiet/${props.idNhaTuyenDung}`}>
                            <p className="ten-cong-ty">{props.tenCty}</p>
                        </Link>
                    </div>
                    <div className="d-flex row">
                        <p className="d-flex align-item-center col-4">
                            <DollarCircleOutlined />
                            <span>{props.mucLuongMongMuon}</span>
                        </p>
                        <p className="d-flex align-item-center col-4">
                            <FaMapMarkerAlt />
                            <span>{props.diaDiemLamViec}</span>
                        </p>
                        <p className="d-flex align-item-center col-4">
                            <ClockCircleOutlined />
                            <span>{tinhThoiGianDaQua(props.created_at, endDate)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CongViecComponent;
