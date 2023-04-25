import React from 'react';
import { GetPostNhaTuyenDungByType } from '../../services/siteServices';
import { Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import ExtendRender from '../../components/UngTuyenComponent/NhaTuyenDung/extendRender';
import { FaChrome, FaEdit, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

export default function NhaTuyenDungChiTiet({ dataRender }) {
    console.log('dataRender :', dataRender);
    return (
        <div
            style={{
                minHeight: '60vh',
            }}
            className="my-4"
        >
            <Row>
                <Col sm={9}>
                    <ExtendRender dataNTD={dataRender} isButton={false} />
                </Col>
                <Col sm={3}>
                    <div className="right-body-item customize-sdsdws">
                        <h6 className="heading text-uppercase text-center">thông tin công ty</h6>
                        <div className="d-flex align-items-center content-item gap-3 mb-2">
                            <FaMapMarkerAlt />
                            <p className="p-0 m-0">{dataRender.diaChi}</p>
                        </div>
                        <div className="d-flex align-items-center content-item gap-3 mb-2">
                            <FaPhoneAlt />
                            <p className="p-0 m-0">
                                <a className="text-decoration-none" href={`tel:${dataRender.soDienThoai}`}>
                                    {dataRender.soDienThoai}
                                </a>
                            </p>
                        </div>
                        <div className="d-flex align-items-center content-item gap-3 mb-2">
                            <FaChrome />
                            <a className="text-decoration-none" target="_blank" href={dataRender.website}>
                                <p className="p-0 m-0">{dataRender.website || 'Đang Cập Nhật'}</p>
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export async function getStaticPaths(data) {
    const res = await GetPostNhaTuyenDungByType();

    const dataArr = res?.data.map((x) => {
        const Obj = {};

        Obj.params = { slug: x?.id };

        return Obj;
    });

    return {
        paths: dataArr,
        fallback: 'blocking', // can also be true or 'blocking'
    };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
    const res = await GetPostNhaTuyenDungByType('detail', String(context?.params?.slug));

    return {
        // Passed to the page component as props
        props: { dataRender: res.data },
        // re
        revalidate: 86400,
    };
}
