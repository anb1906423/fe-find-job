import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import Router, { useRouter } from 'next/router';
import { Image } from 'antd';

import styles from './trangChiTiet.module.scss';
import LazyImg from '../../app/components/LazyImg/LazyImg';
import Dexuatungvien from './components/dexuatungvien/Dexuatungvien';
import { LayThongTinUngVien } from '../../services/siteServices';
import _ from 'lodash';
import convertTime from '../../app/@func/convertTime/convertTime';
import LoadingPending from '../../app/components/loadingPending/loadingPending';
import RenderArray from '../../app/@func/RenderArray';

const cx = classNames.bind(styles);

function TrangChiTiet({ data, isDeXuat = true }) {
    const params = useRouter();

    const handleClick = useCallback(
        (id) => {
            Router.push(`/thong-tin-chi-tiet-ung-vien/${id}`);
        },
        [data],
    );

    useEffect(() => {
        if (!_.isEmpty(data)) {
            document.title = `Thông tin ứng viên ${data.hoVaTen}`;
        }
    }, [data]);

    return (
        <>
            <div className={cx('trang-chi-tiet-wp')}>
                {params.isFallback ? <LoadingPending /> : <></>}
                <div className="container">
                    <Row>
                        <Col lg={!isDeXuat ? 12 : 9}>
                            {!_.isEmpty(data) && (
                                <div className={cx('content-wp')}>
                                    <div className={cx('banner-color')}></div>
                                    <div className={cx('info-first')}>
                                        <div className={cx('avatar')}>
                                            <Image
                                                src={
                                                    data.avatar
                                                        ? data.avatar
                                                        : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png'
                                                }
                                                fallback={
                                                    data.avatar
                                                        ? data.avatar
                                                        : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png'
                                                }
                                                alt={data.hoVaTen}
                                            />
                                        </div>
                                        <div className={cx('info-basic')}>
                                            <h2 className={cx('title-cv')}>{data.hoVaTen}</h2>
                                            <p className={cx('vi-tri')}>
                                                <span>{data.viTriMongMuon ? data.viTriMongMuon : 'Đang cập nhật'}</span>
                                            </p>
                                            <div className={cx('ve-ban-than')}>
                                                <div className={cx('ve-ban-than-left')}>
                                                    <p>
                                                        <i className="bi bi-calendar2-date"></i>
                                                        <span>{convertTime(data.sinhNhat)}</span>
                                                    </p>
                                                    <p>
                                                        <i className="bi bi-phone"></i>
                                                        <span>{data.soDienThoai}</span>
                                                    </p>
                                                    <p>
                                                        <i className="bi bi-pin-map"></i>
                                                        <span>{data.diaChi}</span>
                                                    </p>
                                                </div>
                                                <div className={cx('ve-ban-than-center')}>
                                                    <p>
                                                        <i className="bi bi-gender-ambiguous"></i>
                                                        <span>{data.isMale ? 'Nam' : 'Nữ'}</span>
                                                    </p>
                                                    <p>
                                                        <i className="bi bi-wallet2"></i>
                                                        <span>{data.email}</span>
                                                    </p>
                                                </div>
                                                <div className={cx('ve-ban-than-right')}>
                                                    <p>
                                                        <i className="bi bi-chat-heart-fill"></i>
                                                        <span>{!data.docThan ? 'Không độc thân' : 'Độc thân'}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('next-body')}>
                                        <div className={cx('next-body-left')}>
                                            <span className={cx('next-body-left-icon')}>
                                                <i className="bi bi-person-circle"></i>
                                            </span>
                                            <span>
                                                <strong> Thông tin hồ sơ</strong>
                                            </span>
                                        </div>
                                        <div className={cx('next-body-right')}></div>
                                    </div>
                                    <div className={cx('yeu-cua-va-tieu-chi')}>
                                        <div className={cx('yeu-cua-va-tieu-chi-left')}>
                                            <p>
                                                <span className={cx('fw-500')}>Mức lương mong muốn:</span>
                                                <span>
                                                    {data.mucLuongMongMuon ? data.mucLuongMongMuon : 'Đang cập nhật'}
                                                </span>
                                            </p>
                                            <p>
                                                <span className={cx('fw-500')}>Số năm kinh nghiệm:</span>
                                                <span>{data.kinhNghiem ? data.kinhNghiem : 'Đang cập nhật'}</span>
                                            </p>
                                            <p>
                                                <span className={cx('fw-500')}>Ngành nghề:</span>
                                                <span>
                                                    <RenderArray data={data.linhVucNgheNghiep} />
                                                </span>
                                            </p>
                                        </div>
                                        <div className={cx('yeu-cua-va-tieu-chi-right')}>
                                            <p>
                                                <span className={cx('fw-500')}>Cấp bậc mong muốn:</span>
                                                <span>{data.capBac ? data.capBac : 'Đang cập nhật'}</span>
                                            </p>
                                            <p>
                                                <span className={cx('fw-500')}>Trình độ học vấn:</span>
                                                <span>{data.hocVan ? data.hocVan : 'Đang cập nhật'}</span>
                                            </p>
                                            <p>
                                                <span className={cx('fw-500')}>Nơi làm việc:</span>
                                                <span>
                                                    <RenderArray data={data.diaDiemMongMuonLamViec} />
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('next-body')}>
                                        <div className={cx('next-body-left')}>
                                            <span className={cx('next-body-left-icon')}>
                                                <i className="bi bi-file-earmark-person"></i>
                                            </span>
                                            <span>
                                                <strong> Giới thiệu chung</strong>
                                            </span>
                                        </div>
                                        <div className={cx('next-body-right')}></div>
                                    </div>
                                    <div className={cx('goi-thieu-va-muc-tieu-nghe-nghiep')}>
                                        <div className={cx('gioi-thieu')}>
                                            <div className={cx('top-title')}>
                                                <i className="bi bi-check-circle-fill"></i>
                                                <span>Giới thiệu bản thân</span>
                                            </div>
                                            <p>{data.gioiThieu ? data.gioiThieu : 'Đang cập nhật'}</p>
                                        </div>
                                        <div className={cx('muc-tieu-nghe-nghiep')}>
                                            <div className={cx('top-title')}>
                                                <i className="bi bi-check-circle-fill"></i>
                                                <span>Mục tiêu nghề nghiệp</span>
                                            </div>
                                            <p>{data.mucTieuNgheNghiep ? data.mucTieuNgheNghiep : 'Đang cập nhật'}</p>
                                        </div>
                                    </div>
                                    <div className={cx('next-body')}>
                                        <div className={cx('next-body-left')}>
                                            <span className={cx('next-body-left-icon')}>
                                                <i className="bi bi-filetype-csv"></i>
                                            </span>
                                            <span>
                                                <strong> Học vấn và bằng cấp</strong>
                                            </span>
                                        </div>
                                        <div className={cx('next-body-right')}></div>
                                    </div>
                                    <div className={cx('hoc-van')}>
                                        <div className="mb-3">
                                            <ul>
                                                <li>
                                                    <strong>{data.hocVan ? data.hocVan : 'Đang cập nhật'}</strong>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={cx('next-body')}>
                                        <div className={cx('next-body-left')}>
                                            <span className={cx('next-body-left-icon')}>
                                                <i className="bi bi-filetype-csv"></i>
                                            </span>
                                            <span>
                                                <strong> Trình độ ngoại ngữ</strong>
                                            </span>
                                        </div>
                                        <div className={cx('next-body-right')}></div>
                                    </div>
                                    <div className={cx('trinh-do-tieng-anh')}>
                                        <div className={cx('trinh-do-tieng-anh-top')}>
                                            <div className={cx('title-name')}>Tên Môn</div>
                                            <div className={cx('title-name')}>Nghe</div>
                                            <div className={cx('title-name')}>Nói</div>
                                            <div className={cx('title-name')}>Đọc</div>
                                            <div className={cx('title-name')}>Viết</div>
                                        </div>
                                        <div className={cx('trinh-do-tieng-anh-body')}>
                                            <div className={cx('item-result')}>
                                                <div className={cx('title-result--render')}>Tiếng anh</div>
                                                <div className={cx('title-result--render')}>Trung bình</div>
                                                <div className={cx('title-result--render')}>Trung bình</div>
                                                <div className={cx('title-result--render')}>Trung bình</div>
                                                <div className={cx('title-result--render')}>Trung bình</div>
                                            </div>
                                            <div className={cx('item-result')}>
                                                <div className={cx('title-result--render')}>Tiếng Pháp</div>
                                                <div className={cx('title-result--render')}>Trung bình</div>
                                                <div className={cx('title-result--render')}>Trung bình</div>
                                                <div className={cx('title-result--render')}>Trung bình</div>
                                                <div className={cx('title-result--render')}>Trung bình</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Col>
                        {isDeXuat && (
                            <Col lg={3} className={cx('de-xuat-ung-vien-wp')}>
                                <div className={cx('title-suggest')}>
                                    <span>Ứng viên đề xuất</span>
                                </div>
                                <Dexuatungvien params={params} cx={cx} handleClick={handleClick} />
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
        </>
    );
}

TrangChiTiet.propTypes = {};

export default TrangChiTiet;
