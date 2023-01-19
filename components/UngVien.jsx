import React from "react";

const UngVien = (props) => {
  return (
    <div className="ung-vien">
      <div className="avatar-box">
        <img src={props.avatar} alt="" className="avatar" />
      </div>
      <div className="thong-tin-khac">
        <h6 className="vi-tri-mong-muon">{props.viTriMongMuon}</h6>
        <div className="ho-va-ten">
          <p>{props.hoVaTen}</p>
        </div>
        <div className="thong-tin-khac">
          <h6 className="sinh-nhat">{props.sinhNhat}</h6>
          <h6 className="hoc-van">{props.hovVan}</h6>
          <h6 className="hoc-van">{props.hovVan}</h6>
          <h6 className="muc-luong-mong-muon">{props.mucLuongMongMuon}</h6>
        </div>
      </div>
    </div>
  );
};

export default UngVien;
