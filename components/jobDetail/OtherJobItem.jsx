import React, { useState } from 'react';
import { DollarCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import ChiTietCongViec from '../../pages/cong-viec/[id]';

function convertTime(timeString) {
    const date = new Date(timeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
}

const OtherJobItem = (props) => {
    
    return (
        <div className='other-jobs-item'>
            <div className="row">
                <div className="col-12 info-box">
                    <div>
                        <div className="">
                            <h6 className="text-uppercase chuc-danh">{props.chucDanh}</h6>
                        </div>
                    </div>
                    <div>
                        <Link href={`/chi-tiet/${props.idNhaTuyenDung}`}>
                            <h6 className="ten-cong-ty">{props.tenCty}</h6>
                        </Link>
                    </div>
                    <div className="d-flex row">
                        <p className="d-flex align-items-center col-4 mb-0">
                            <DollarCircleOutlined />
                            <span>{props.mucLuongMongMuon}</span>
                        </p>
                        <p className="d-flex align-items-center col-4 mb-0">
                            <FaMapMarkerAlt />
                            <span>{props.diaDiemLamViec}</span>
                        </p>
                        <p className="d-flex align-items-center col-4 mb-0">
                            <ClockCircleOutlined />
                            <span>{convertTime(props.created_at)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtherJobItem