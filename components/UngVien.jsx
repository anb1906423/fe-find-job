import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Tippy from '@tippyjs/react';
import { Col, Row } from 'react-bootstrap';

import LazyImg from '../app/components/LazyImg/LazyImg';

const UngVien = ({ dulieu }) => {
    return (
        <div className="ung-vien">
            <div className="container">
                <Row>
                    {dulieu && dulieu.length > 0 ? (
                        dulieu.map((item) => {
                            const id = uuidv4();

                            return (
                                <Col sm={6} key={id}>
                                    <div className="ung-vien-item">
                                        <div className="avatar-box">
                                            <LazyImg
                                                link="https://static.beecost.vn/upload/uploads/2020/05/hinh-anh-co-gai-buon-2.jpg"
                                                alt="Hình ảnh ứng viên"
                                                className="avatar"
                                            />
                                        </div>
                                        <div className="thong-tin-khac">
                                            <div>
                                                <Tippy content="Lập trình viên website">
                                                    <h6 className="vi-tri-mong-muon">
                                                        <i className="bi bi-link-45deg"></i>
                                                        <span className="mx-1">IT lập trình viên website</span>
                                                    </h6>
                                                </Tippy>
                                            </div>
                                            <div className="ho-va-ten">
                                                <div className="d-d-inline-block">
                                                    <Tippy content="Nguyễn Văn A">
                                                        <span>
                                                            <i className="bi bi-gender-male"></i>
                                                            <span className="mx-1">Nguyễn Văn A</span>
                                                        </span>
                                                    </Tippy>
                                                </div>
                                            </div>
                                            <div className="thong-tin-khac-ve-ung-vien">
                                                <h6 className="sinh-nhat">
                                                    <i className="bi bi-calendar"></i>
                                                    <span className="mx-1">09 / 12 / 2003</span>
                                                </h6>
                                                <h6 className="hoc-van">
                                                    <i className="bi bi-mortarboard"></i>
                                                    <span className="mx-1">Đại học</span>
                                                </h6>
                                                <h6 className="kinh-nghiem">
                                                    <i className="bi bi-person-workspace"></i>
                                                    <span className="mx-1">Dưới 1 năm</span>
                                                </h6>
                                                <h6 className="muc-luong-mong-muon">
                                                    <i className="bi bi-star"></i>
                                                    <span className="mx-1">Thỏa thuận</span>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            <p>Hiện tại không có dữ liệu ứng viên nào</p>
                        </div>
                    )}
                </Row>
            </div>
        </div>
    );
};

UngVien.propTypes = {
    dulieu: PropTypes.array,
};

export default UngVien;

{
    /* <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Vị trí mong muốn</th>
                        <th scope="col">Họ Và Tên</th>
                        <th scope="col" className="th-thong-tin-khac">
                            Thông tin khác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dulieu &&
                        dulieu.length > 0 &&
                        dulieu.map((item, index) => {
                            const id = uuidv4();
                            return (
                                <tr key={id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <LazyImg link={item.avatar} alt="Hình ảnh hiển thị" className="avatar" />
                                    </td>
                                    <td>{item.viTriMongMuon}</td>
                                    <td>{item.hoVaTen}</td>
                                    <td>
                                        <h6 className="sinh-nhat">Ngày sinh : {item.sinhNhat}</h6>
                                        <h6 className="hoc-van">
                                            Học vấn : Từng làm dev web tại vccop , Tham gia freelance dự án alotera Từng
                                            làm dev web tại vccop , Tham gia freelance dự án aloteraTừng làm dev web tại
                                            vccop , Tham gia freelance dự án aloteraTừng làm dev web tại vccop , Tham
                                            gia freelance dự án aloteraTừng làm dev web tại vccop , Tham gia freelance
                                            dự án aloteraTừng làm dev web tại vccop , Tham gia freelance dự án alotera
                                        </h6>
                                        <h6 className="muc-luong-mong-muon">
                                            Mức lương mong muốn đạt được : {item.mucLuongMongMuon}
                                        </h6>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table> */
}

/* 
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
 */
