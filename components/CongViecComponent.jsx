import React from 'react'
import { DollarCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Link from 'next/link';

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
  const endDate = new Date();
  return (
    <div className='cong-viec-component col-6 gx-3'>
      <div className="row">
        <div className="col-3 image-box d-flex justify-content-center align-items-center">
          <Link href="#">
            <img src={props.logoCty || "https://www.ruhr24jobs.de/static/og-image.jpg"} alt="Logo công ty" />
          </Link>
        </div>
        <div className="col-9 info-box">
          <div>
            <Link href="#">
              <h6 className="text-uppercase chuc-danh">
                {props.chucDanh}
              </h6>
            </Link>
          </div>
          <div>
            <Link href="#">
              <p className='ten-cong-ty'>{props.tenCty}</p>
            </Link>
          </div>
          <div className="d-flex row">
            <p className='d-flex align-item-center col-4'>
              <DollarCircleOutlined />
              <span>
                {props.mucLuongMongMuon}
              </span>
            </p>
            <p className='d-flex align-item-center col-4'>
              <FaMapMarkerAlt />
              <span>
                {props.diaDiemLamViec}
              </span>
            </p>
            <p className='d-flex align-item-center col-4'>
              <ClockCircleOutlined />
              <span>
                {tinhThoiGianDaQua(props.created_at, endDate)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CongViecComponent