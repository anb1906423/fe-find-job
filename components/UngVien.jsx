import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Tippy from '@tippyjs/react';
import { Col, Row } from 'react-bootstrap';

import LazyImg from '../app/components/LazyImg/LazyImg';
import convertTime from '../app/@func/convertTime/convertTime';
import Link from 'next/link';

const UngVien = ({ dulieu }) => {
    return (
        <div className="ung-vien">
            <div className="container">
                <Row>
                    {dulieu && dulieu.length > 0 ? (
                        dulieu.map((item) => {
                            const id = uuidv4();
                            if (item.state) {
                                return (
                                    <Col sm={6} key={id}>
                                        <Link href={`/thong-tin-chi-tiet-ung-vien/${item.id}`}>
                                            <div className="ung-vien-item">
                                                <div className="avatar-box">
                                                    <LazyImg
                                                        link={
                                                            item.avatar
                                                                ? item.avatar
                                                                : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png'
                                                        }
                                                        alt="Hình ảnh ứng viên"
                                                        className="avatar"
                                                    />
                                                </div>
                                                <div className="thong-tin-khac">
                                                    <div>
                                                        <Tippy content={item.viTriMongMuon ? item.viTriMongMuon : 'Đang cập nhật'}>
                                                            <h6 className="vi-tri-mong-muon">
                                                                <i className="bi bi-link-45deg"></i>

                                                                <span className="mx-1">
                                                                    {item.viTriMongMuon ? item.viTriMongMuon : 'Đang cập nhật'}
                                                                </span>
                                                            </h6>
                                                        </Tippy>
                                                    </div>
                                                    <div className="ho-va-ten">
                                                        <div className="d-d-inline-block">
                                                            <Tippy content={item.hoVaTen}>
                                                                <span>
                                                                    {item.isMale ? (
                                                                        <i className="bi bi-gender-male"></i>
                                                                    ) : (
                                                                        <i className="bi bi-gender-female"></i>
                                                                    )}
                                                                    <span className="mx-1">{item.hoVaTen}</span>
                                                                </span>
                                                            </Tippy>
                                                        </div>
                                                    </div>
                                                    <div className="thong-tin-khac-ve-ung-vien">
                                                        <h6 className="sinh-nhat">
                                                            <i className="bi bi-calendar"></i>
                                                            <span className="mx-1">
                                                                {item.sinhNhat
                                                                    ? convertTime(item.sinhNhat)
                                                                    : 'Đang cập nhật'}
                                                            </span>
                                                        </h6>
                                                        <h6 className="hoc-van">
                                                            <i className="bi bi-mortarboard"></i>
                                                            <span className="mx-1">
                                                                {' '}
                                                                {item.hocVan ? item.hocVan : 'Đang cập nhật'}
                                                            </span>
                                                        </h6>
                                                        <h6 className="kinh-nghiem">
                                                            <i className="bi bi-person-workspace"></i>
                                                            <span className="mx-1">
                                                                {item.mucLuongMongMuon
                                                                    ? item.mucLuongMongMuon
                                                                    : 'Đang cập nhật'}
                                                            </span>

                                                            <h5 className="muc-luong-mong-muon"></h5>
                                                            <i className="bi bi-star"></i>
                                                            <span className="mx-1">
                                                                {item.kinhNghiem ? item.kinhNghiem : 'Đang cập nhật'}
                                                            </span>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                );
                            }
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
