import React, { useEffect, useState } from 'react';
import useGetRoleUser from '../../../app/hook/useGetRoleUser/useGetRoleUser';
import { roleUser } from '../../../util/constant';
import { useRouter } from 'next/router';
import { getDataLimitUngTuyen } from '../../../services/ungTuyenServices';
import convertTime from '../../../app/@func/convertTime/convertTime';
import _ from 'lodash';

export default function UngTuyenUngVien() {
    const userInfo = useGetRoleUser();
    const router = useRouter();

    const [data, setData] = useState([]);
    const [metaData, setMetaData] = useState({});

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

    const handleNextPage = () => {
        if (metaData.nextPage) {
            setCurrentPage(metaData.nextPage);
        }
    };

    return (
        <div className="py-4">
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên Công Ty</th>
                        <th scope="col">SDT</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Thời Gian UT</th>
                        <th scope="col">Thời Gian Hẹn</th>
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
                                    {item.isConfirmedNTD && item.time_Appointment
                                        ? item.time_Appointment
                                        : 'NTD chưa hẹn lịch'}
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
