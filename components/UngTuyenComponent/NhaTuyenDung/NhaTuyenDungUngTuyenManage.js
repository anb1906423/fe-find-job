import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { roleUser } from '../../../util/constant';
import useGetRoleUser from '../../../app/hook/useGetRoleUser/useGetRoleUser';

export default function NhaTuyenDungUngTuyenManage() {
    const userInfo = useGetRoleUser();
    const router = useRouter();

    const [data, setData] = useState([]);
    const [metaData, setMetaData] = useState({});

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (userInfo?.role !== roleUser.NhaTuyenDung) {
            router.push('/404-not-found');
        } else {
            const Fetch = async () => {
                try {
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

    return <div>NhaTuyenDungUngTuyenManage</div>;
}
