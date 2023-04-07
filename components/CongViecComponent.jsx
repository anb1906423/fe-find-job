import React from 'react'

const CongViecComponent = (props) => {
  return (
    <div className='cong-viec-component col-6 gx-3'>
      <div className="row">
        <div className="col-3">
          <img src={props.logoCty || "https://www.ruhr24jobs.de/static/og-image.jpg"} alt="Logo công ty" />
        </div>
        <div className="col-9">
          <div>
            <h6 className="text-uppercase">
              {props.chucDanh}
            </h6>
          </div>
          <div>
            <p>{props.tenCty}</p>
          </div>
          <div className="d-flex">
            <p>{props.mucLuongMongMuon}</p>
            <p>{props.diaDiemLamViec}</p>
            <p>{props.created_at}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CongViecComponent