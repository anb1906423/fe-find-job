import React, { useEffect, useState } from 'react';
import useGetRoleUser from '../../../app/hook/useGetRoleUser/useGetRoleUser';
import { roleUser } from '../../../util/constant';
import { useRouter } from 'next/router';
import { changeTimeAppointment, getDataLimitUngTuyen } from '../../../services/ungTuyenServices';
import convertTime from '../../../app/@func/convertTime/convertTime';
import _ from 'lodash';
import { Modal } from 'antd';
import { swtoast } from '../../../mixins/swal.mixin';

export default function UngTuyenUngVien() {
    const userInfo = useGetRoleUser();
    const router = useRouter();

    const [data, setData] = useState([]);
    const [metaData, setMetaData] = useState({});
    const [time_Appointment, setTimeAppointment] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [dataModalID, setDataModalID] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!userInfo?.role || userInfo?.role !== roleUser.UngVien) {
            router.push('/404-not-found');
        } else {
            const Fetch = async () => {
                try {
                    const Res = await getDataLimitUngTuyen({
                        page: currentPage,
                        limit: 10,
                        typeQuery: 'idUngVien',
                        data: {
                            idQuery: userInfo?.id,
                        },
                    });

                    if (Res && Res.errCode === 0) {
                        setData((prev) => [...prev, ...Res.data]);
                        setMetaData(Res.meta);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            Fetch();
        }
    }, [userInfo?.role, currentPage]);

    useEffect(() => {
        setTimeAppointment('');
        setIsOpenModal(false);
        setDataModalID('');
    }, []);

    const handleNextPage = () => {
        if (metaData.nextPage) {
            setCurrentPage(metaData.nextPage);
        }
    };

    const handleChooseAgainTimeAppointment = async (id) => {
        if (!time_Appointment) {
            swtoast.fire({
                text: 'Bạn chưa chọn lại thời gian với nhà tuyển dụng ',
            });
            return;
        }

        const dataBuild = {
            id,
            time_Appointment,
        };

        try {
            const Res = await changeTimeAppointment(dataBuild);

            if (Res && Res.errCode === 0) {
                swtoast.fire({
                    text: 'Bạn đã hẹn lại thời gian phỏng vấn với nhà tuyển dụng thành công vui lòng chờ nhà tuyển dụng xác nhận. Xin cảm ơn!',
                });

                const dataReplacements = data.map((item) => {
                    if (item.id === Res?.data?.id) {
                        return Res?.data;
                    }

                    return item;
                });

                setData(dataReplacements);
            } else {
                swtoast.fire({
                    text: Res.msg,
                });
            }
        } catch (error) {
            alert(error);
            swtoast.fire({
                text: error.msg,
            });
        }
    };

    return (
        <div className="py-4">
            <Modal
                open={isOpenModal}
                onCancel={() => {
                    setIsOpenModal(false);
                    setTimeAppointment('');
                    setDataModalID('');
                }}
                onOk={() => handleChooseAgainTimeAppointment(dataModalID)}
            >
                <div>
                    <h6 className="text-center">Chọn lại lịch hẹn của nhà tuyển dụng</h6>
                    <label className="my-2">vui lòng chọn thời gian thay đổi lịch hẹn</label>
                    <input
                        type="date"
                        value={time_Appointment}
                        onChange={(e) => setTimeAppointment(e.target.value)}
                        className="form-control"
                    />
                </div>
            </Modal>
            <table className="table align-middle">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên Công Ty</th>
                        <th scope="col">SDT</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Thời Gian UT</th>
                        <th scope="col">Thời Gian Hẹn</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.tenCongty}</td>
                                <td>{item.soDienThoai}</td>
                                <td>{`${item.isNotify && 'Đã nhận tin'} và nhà tuyển dụng ${
                                    item.isNew ? 'chưa xem hồ sơ' : `đã xem hồ sơ`
                                }`}</td>
                                <td>
                                    {new Date(+item.time).toLocaleTimeString('vi-VI')}
                                    {` ngày `}
                                    {new Date(+item.time).toLocaleDateString('vi-VI')}
                                </td>
                                <td>
                                    {!item.isConfirmedNTD
                                        ? item.time_again_Appointment
                                            ? `${item.time_again_Appointment} đang chờ nhà tuyển dụng xác nhận`
                                            : 'Chưa có lịch hẹn'
                                        : item.time_Appointment
                                        ? item.time_Appointment
                                        : 'NTD chưa hẹn lịch'}
                                </td>
                                <td>
                                    {(item.isConfirmedNTD && item.time_Appointment) || item.time_again_Appointment ? (
                                        <button
                                            onClick={() => {
                                                setIsOpenModal(true);
                                                setDataModalID(item._id);
                                            }}
                                            className="btn btn-outline-primary"
                                            title="Thay đổi lịch hẹn"
                                        >
                                            <i className="bi bi-tools"></i>
                                        </button>
                                    ) : (
                                        <button className="btn btn-outline-primary" title="Thay đổi lịch hẹn">
                                            <i className="bi bi-tools"></i>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <th colSpan={5} scope="row">
                                Bạn chưa ứng tuyển ở nơi nào
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
            {metaData.hasNextPage && (
                <div className="my-4 d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={handleNextPage}>
                        Xem thêm
                    </button>
                </div>
            )}
        </div>
    );
}
