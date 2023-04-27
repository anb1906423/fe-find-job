import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FaChrome, FaEdit, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Col, Row } from 'react-bootstrap';

import style from '../../components/UngTuyenComponent/ungtuyen.module.scss';
import { manageUngTuyen, roleUser, typeUngTuyen } from '../../util/constant';
import useGetRoleUser from '../../app/hook/useGetRoleUser/useGetRoleUser';

import Loading from '../../app/components/loading/loading';
import ExtendRender from '../../components/UngTuyenComponent/NhaTuyenDung/extendRender';
import axios from 'axios';
import { backendAPI } from '../../config';

const cx = classNames.bind(style);

export default function NhaTuyenDungUngTuyenManage({ danhSachNTD, nhaTuyenDung }) {

    const router = useRouter();

    const idNTD = router.query.id;
    // const { idNTD } = useParams();
    // data nha tuyen dung
    const [dataNTD, setDataNTD] = useState([]);
    // const [nhaTuyenDung, setNhaTuyenDung] = useState([])

    // data of list ung tuyem
    const [isLoading, setIsLoading] = useState(false);

    // pagination
    const [metaData, setMetaData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    // modal view
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [dataModal, setDataModal] = useState({});

    useEffect(() => {
        danhSachNTD && danhSachNTD.map((item) => {
            if (item.id == idNTD) {
                setDataNTD(item)
            }
        })
    }, [idNTD])

    console.log(nhaTuyenDung);

    return (
        <>
            <div className={cx('wp')}>
                {isLoading && <Loading />}
                <Row>
                    <Col md={9}>
                        <div className={cx('congty')}>
                            <div
                                style={{
                                    backgroundImage: `url(${dataNTD?.banner
                                        ? dataNTD?.banner
                                        : 'https://lambanner.com/wp-content/uploads/2021/03/MNT-DESIGN-TOP-KICH-THUOC-BANNER-QUANG-CAO-GOOGLE-2021-1130x570.jpg'
                                        })`,
                                }}
                                className={cx('banner')}
                            ></div>
                            <div
                                className={cx('avatar')}
                                style={{
                                    backgroundImage: `url(${dataNTD?.anhCongTy ? dataNTD?.anhCongTy : '../img/no-avatar.jpg'})`,
                                }}
                            ></div>
                        </div>
                        <div className={cx('body-content')}>

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
                                    <p className="p-0 m-0">{dataNTD.website}</p>
                                </a>
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