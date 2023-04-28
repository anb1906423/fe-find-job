import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { FaChrome, FaEdit, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Col, Row } from 'react-bootstrap';

import style from '../ungtuyen.module.scss';
import { manageUngTuyen, roleUser, typeUngTuyen } from '../../../util/constant';
import useGetRoleUser from '../../../app/hook/useGetRoleUser/useGetRoleUser';
import {
    changeCheckNew,
    deleteOrRestoreUngVien,
    getDataLimitUngTuyen,
    getInfoNhaTuyenDung,
} from '../../../services/ungTuyenServices';
import Loading from '../../../app/components/loading/loading';
import { Modal } from 'antd';
import { LayThongTinUngVien } from '../../../services/siteServices';
import TrangChiTiet from '../../TrangChiTiet/TrangChiTiet';
import ExtendRender from './extendRender';

const cx = classNames.bind(style);

export default function NhaTuyenDungUngTuyenManage() {
    const userInfo = useGetRoleUser();
    const router = useRouter();

    // data nha tuyen dung
    const [dataNTD, setDataNTD] = useState({});

    // data of list ung tuyem
    const [data, setData] = useState([]);
    const [navSearch, setNavSearch] = useState([]);
    const [options, setOptions] = useState([]);
    const [typeQuery, setTypeQuery] = useState('idNhaTuyenDung');
    const [idQuery, setIdQuery] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [time_Appointment, setTimeAppointment] = useState('');

    // pagination
    const [metaData, setMetaData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    // state btn
    const [activeBtn, setActiveBtn] = useState(manageUngTuyen.allUngVien);

    // modal view
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const Fetch = async () => {
        try {
            setIsLoading(true);

            const Res = await getDataLimitUngTuyen({
                page: currentPage,
                limit: 10,
                typeQuery: typeQuery,
                data: {
                    idQuery: idQuery || userInfo?.id,
                    type: activeBtn === manageUngTuyen.allUngVien ? false : true,
                },
            });

            setIsLoading(false);

            if (Res && Res.errCode === 0) {
                setData((prev) => [...prev, ...Res.data]);
                setMetaData(Res.meta);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userInfo?.role !== roleUser.NhaTuyenDung) {
            router.push('/404-not-found');
        } else {
            if (activeBtn === manageUngTuyen.trashUngTuyen) {
                setData([]);
            }

            Fetch();
        }
    }, [userInfo?.id, currentPage, typeQuery, idQuery, activeBtn]);

    useEffect(() => {
        if (userInfo?.role !== roleUser.NhaTuyenDung) {
        } else {
            const FetchAPI = async () => {
                try {
                    const [ResNavSearch, ResNTD] = await Promise.all([
                        getDataLimitUngTuyen({
                            page: 1,
                            limit: 1000,
                            data: {
                                idQuery: userInfo?.id,
                            },
                        }),
                        getInfoNhaTuyenDung(userInfo?.id),
                    ]);

                    if (ResNavSearch && ResNavSearch.errCode === 0) {
                        setNavSearch(ResNavSearch.data);
                    }

                    if (ResNTD) {
                        setDataNTD(ResNTD);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            FetchAPI();
        }
    }, [userInfo?.id]);

    useEffect(() => {
        if (navSearch && navSearch.length > 0) {
            let dataCatche = [];
            const dataBuiler = [
                {
                    value: userInfo?.id,
                    label: 'Tất cả',
                    name: 'all',
                },
            ];
            navSearch.map((item) => {
                if (dataCatche.indexOf(item.idJobPost) === -1) {
                    dataCatche.push(item.idJobPost);

                    const Obj = {};
                    Obj.label = item.tenJob;
                    Obj.value = item.idJobPost;

                    dataBuiler.push(Obj);
                }
            });

            setOptions(dataBuiler);
        }
    }, [navSearch]);

    useEffect(() => {
        setTimeAppointment('');
        router.push(`/manage-apply/view-all-dashboard?isAll=true`);
        setIsOpenModal(false);
    }, []);

    useEffect(() => {
        if (isOpenModal) {
            const dataID = router.query?.dataID;
            const idUngTuyen = router.query?.ungtuyen;

            if (dataID && idUngTuyen) {
                const FetchUserUngVien = async () => {
                    try {
                        setIsLoading(true);

                        const ResUserUngVien = await LayThongTinUngVien(dataID);
                        const ResCheckNew = await changeCheckNew({
                            id: idUngTuyen,
                        });

                        setIsLoading(false);

                        if (ResUserUngVien && ResUserUngVien.data) {
                            setDataModal(ResUserUngVien.data);
                        }

                        if (ResCheckNew && ResCheckNew.errCode === 0) {
                            const builAgainData = data.map((item) => {
                                if (item._id === ResCheckNew.data._id) {
                                    return ResCheckNew.data;
                                }

                                return item;
                            });

                            setData(builAgainData);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };

                FetchUserUngVien();
            }
        } else {
            setDataModal({});
        }
    }, [isOpenModal, router]);

    const handleAppointment = (type) => {
        if (isOpenModal) {
            const dataID = router.query?.dataID;
            const idUngTuyen = router.query?.ungtuyen;

            if (!time_Appointment && type !== 'cancel') {
                alert('Bạn chưa chọn thời gian hẹn !');
                return;
            }

            if (dataID && idUngTuyen) {
                const FetchUserUngVien = async () => {
                    try {
                        setIsLoading(true);

                        const ResCheckNew = await changeCheckNew({
                            id: idUngTuyen,
                            time_Appointment: type === 'cancel' ? '' : time_Appointment,
                            type: type === 'cancel' ? 'cancel' : 'book',
                        });

                        setIsLoading(false);

                        if (ResCheckNew && ResCheckNew.errCode === 0) {
                            const builAgainData = data.map((item) => {
                                if (item._id === ResCheckNew.data._id) {
                                    return ResCheckNew.data;
                                }

                                return item;
                            });

                            setData(builAgainData);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };

                FetchUserUngVien();
            }
        } else {
            setDataModal({});
        }
    };

    const handleNextPage = () => {
        if (metaData.nextPage) {
            setCurrentPage(metaData.nextPage);
        }
    };

    const handleChangeReactSelect = (selectedOption) => {
        setData([]);
        setCurrentPage(1);

        if (selectedOption.name) {
            setTypeQuery('idNhaTuyenDung');
            setIdQuery(selectedOption?.value);
            return;
        }

        setTypeQuery('idJobPost');
        setIdQuery(selectedOption?.value);
    };

    const handleTrashOrRestoreUngVien = async (id, type) => {
        console.log(type === typeUngTuyen.delete);

        setIsLoading(true);

        if (type === typeUngTuyen.delete) {
            try {
                const ResDelete = await deleteOrRestoreUngVien({
                    type: true,
                    id,
                });

                if (ResDelete && ResDelete.errCode === 0) {
                    const dataRes = data.filter((item) => item?._id !== ResDelete?.data?._id);

                    setData(dataRes);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (type === typeUngTuyen.restore) {
            try {
                const ResDelete = await deleteOrRestoreUngVien({
                    type: false,
                    id,
                });

                if (ResDelete && ResDelete.errCode === 0) {
                    const dataRes = data.filter((item) => item?._id !== ResDelete?.data?._id);

                    setData(dataRes);
                }
            } catch (error) {
                console.log(error);
            }
        }

        setIsLoading(false);
    };

    const handleCLickViewUngVien = (id, idUngTuyen, type) => {
        if (type === manageUngTuyen.showModal) {
            router.push(
                `/manage-apply/view-all-dashboard?isAll=true&isModal=true&dataID=${id}&ungtuyen=${idUngTuyen}&isView=${true}`,
            );
            setIsOpenModal(true);
        } else {
            router.push(`/manage-apply/view-all-dashboard?isAll=true`);
            setIsOpenModal(false);
        }
    };

    console.log(data.find((item) => item.idUngVien === dataModal.id));

    return (
        <>
            <Modal
                open={isOpenModal}
                footer={null}
                onCancel={() => handleCLickViewUngVien(null, !manageUngTuyen.showModal)}
                width={'90vw'}
                height={'100vh'}
            >
                <div>
                    <div className={cx('time_appointment')}>
                        <labe>Nếu bạn ưng ứng viên này hãy cho họ lịch phỏng vấn</labe>
                        <input
                            onChange={(e) => setTimeAppointment(e.target.value)}
                            className="form-control"
                            type="date"
                            value={
                                time_Appointment ||
                                data.find((item) => item.idUngVien === dataModal.id)?.time_Appointment
                            }
                        />
                        <div className="d-flex justify-content-end">
                            <button
                                onClick={() => handleAppointment('cancel')}
                                className="btn btn-success p-2 my-3 mx-2"
                            >
                                Huỷ lịch hẹn
                            </button>
                            <button onClick={handleAppointment} className="btn btn-primary p-2 my-3 mx-2">
                                Tạo thời gian hẹn
                            </button>
                        </div>
                    </div>
                    <TrangChiTiet data={dataModal} isDeXuat={false} />
                </div>
            </Modal>
            <div className={cx('wp')}>
                {isLoading && <Loading />}
                <Row>
                    <Col md={9}>
                        <ExtendRender dataNTD={dataNTD} />
                        <div className={cx('body-content')}>
                            <div className={cx('navication')}>
                                <div className={cx('left-nav')}>
                                    <button
                                        onClick={() => setActiveBtn(manageUngTuyen.allUngVien)}
                                        className={cx(
                                            'btn-cus',
                                            activeBtn === manageUngTuyen.allUngVien ? 'active' : '',
                                        )}
                                    >
                                        <i className="bi bi-cast"></i>
                                        <span>HS ứng tuyển</span>
                                        {data.filter((item) => item.isNew).length ? (
                                            <span className={cx('count')}>
                                                {data.filter((item) => item.isNew).length}
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveBtn(manageUngTuyen.trashUngTuyen)}
                                        className={cx(
                                            'btn-cus',
                                            activeBtn === manageUngTuyen.trashUngTuyen ? 'active' : '',
                                        )}
                                    >
                                        <i className="bi bi-trash2-fill"></i>
                                        <span>Ứng tuyển bị loại</span>
                                    </button>
                                </div>
                                <div className={cx('right-nav')}>
                                    <Select
                                        className={cx('select-search')}
                                        placeholder="Xắp xếp theo..."
                                        options={options}
                                        onChange={handleChangeReactSelect}
                                    />
                                </div>
                            </div>
                            <div className={cx('content')}>
                                <h5>Danh sách hồ sơ ứng tuyển</h5>
                                <div className="mt-3">
                                    <table className="table">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Tiêu đề</th>
                                                <th scope="col">Email ứng viên</th>
                                                <th scope="col">Thời gian</th>
                                                <th scope="col" className="text-center">
                                                    Hành động
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data &&
                                                data.length > 0 &&
                                                data.map((item, index) => (
                                                    <tr key={item._id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td
                                                            onClick={() =>
                                                                handleCLickViewUngVien(
                                                                    item.idUngVien,
                                                                    item._id,
                                                                    manageUngTuyen.showModal,
                                                                )
                                                            }
                                                        >
                                                            {item.tenJob}
                                                        </td>
                                                        <td
                                                            onClick={() =>
                                                                handleCLickViewUngVien(
                                                                    item.idUngVien,
                                                                    item._id,
                                                                    manageUngTuyen.showModal,
                                                                )
                                                            }
                                                        >
                                                            {item.emailUngVien}
                                                        </td>
                                                        <td>
                                                            {' '}
                                                            {new Date(+item.time).toLocaleTimeString('vi-VI')}
                                                            {` ngày `}
                                                            {new Date(+item.time).toLocaleDateString('vi-VI')}
                                                        </td>
                                                        <td className="text-center">
                                                            <button
                                                                onClick={() =>
                                                                    handleTrashOrRestoreUngVien(
                                                                        item._id,
                                                                        activeBtn === manageUngTuyen.allUngVien
                                                                            ? typeUngTuyen.delete
                                                                            : typeUngTuyen.restore,
                                                                    )
                                                                }
                                                                title="loại bỏ ứng viên"
                                                                className="btn btn-primary"
                                                            >
                                                                {activeBtn === manageUngTuyen.allUngVien ? (
                                                                    <i className="bi bi-trash2-fill"></i>
                                                                ) : (
                                                                    <i className="bi bi-sign-turn-left"></i>
                                                                )}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                    {metaData.hasNextPage && (
                                        <div onClick={handleNextPage} className="my-3 d-flex justify-content-center">
                                            <button className="btn btn-primary">Xem thêm</button>
                                        </div>
                                    )}
                                </div>
                            </div>
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
                            <div className="d-flex align-items-center content-item gap-3 mb-2">
                                <FaEdit />
                                <a className="text-decoration-none" href="">
                                    <p className="p-0 m-0">Xem chi tiết công ty</p>
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}
