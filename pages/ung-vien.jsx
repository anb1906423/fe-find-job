import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import axios from './api/axiosApi';
import Heading from '../components/Heading';
import UngVien from '../components/UngVien';
import Head from 'next/head';
import { backendAPI } from '../config';
import _ from 'lodash';

const limit = 6;

const TrangUngVien = () => {
    const [danhSachUngVien, datDanhSachUngVien] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [metaData, setMetaData] = useState({});

    // fetch api
    useEffect(() => {
        const fetch = async () => {
            try {
                const Res = await axios.get(`${backendAPI}/ung-vien?page=${currentPage}&limit=${limit}`);

                if (Res.data) {
                    datDanhSachUngVien((prev) => [...prev, ...Res.data.data]);
                    setMetaData(Res.data.meta);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetch();
    }, [currentPage]);

    const handleLoadMoreUngVien = () => {
        if (!_.isEmpty(metaData)) {
            if (metaData.nextPage) {
                setCurrentPage(metaData.nextPage);
            }
        }
    };

    return (
        <>
            <Head>
                <title>Danh sách ưng viên</title>
            </Head>
            <div className="trang-ung-vien">
                <Heading tieuDe="Tất cả ứng viên" />
                <div className="danh-sach-ung-vien">
                    {danhSachUngVien && danhSachUngVien.length > 0 ? (
                        <UngVien
                            handleLoadMoreUngVien={handleLoadMoreUngVien}
                            currentPage={currentPage}
                            metaData={metaData}
                            dulieu={danhSachUngVien}
                        />
                    ) : (
                        <p>Danh sách ứng viên đang được cập nhật</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default TrangUngVien;
