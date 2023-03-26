import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import axios from './api/axiosApi';
import Heading from '../components/Heading';
import UngVien from '../components/UngVien';
import Head from 'next/head';
import { backendAPI } from '../config';

const TrangUngVien = () => {
    // fake dữ liệu đầu vào tạm thời
    const [danhSachUngVien, datDanhSachUngVien] = useState([]);

    // fetch api
    useEffect(() => {
        const fetch = async () => {
            try {
                const Res = await axios.get(`${backendAPI}/ung-vien`);

                if (Res.data) {
                    datDanhSachUngVien(Res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetch();
    }, []);

    console.log(danhSachUngVien);

    return (
        <>
            <Head>
                <title>Danh sách ưng viên</title>
            </Head>
            <div className="trang-ung-vien">
                <Heading tieuDe="Tất cả ứng viên" />
                <div className="danh-sach-ung-vien">
                    {danhSachUngVien && danhSachUngVien.length > 0 ? (
                        <UngVien dulieu={danhSachUngVien} />
                    ) : (
                        <p>Danh sách ứng viên đang được cập nhật</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default TrangUngVien;
