import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import axios from './api/axiosApi';
import Heading from '../components/Heading';
import UngVien from '../components/UngVien';
import Head from 'next/head';
<<<<<<< HEAD
import { swtoast } from '../mixins/swal.mixin';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import { backendAPI } from '../config';
import Heading from '../components/Heading';
import axios from './api/axios';
import * as actions from '../store/actions';

const PHONENUMBER_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PWD_REGEX = /^[a-zA-Z0-9]+$/;

const DangKyUngVien = () => {
    const isLogin = useSelector((state) => state.user.isLoggedIn);

    const hoVaTenRef = useRef();
    const dispatch = useDispatch();

    const emailRef = useRef();
    const matKhauRef = useRef();
    const diaChiRef = useRef();
    const soDienThoaiRef = useRef();
    const sinhNhatRef = useRef();

    const [hoVaTen, setHoVaTen] = useState('');
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [sinhNhat, setSinhNhat] = useState('');
    const [isMale, setIsMale] = useState();

    const [err, setErr] = useState('');
=======
import { backendAPI } from '../config';

const TrangUngVien = () => {
    // fake dữ liệu đầu vào tạm thời
    const [danhSachUngVien, datDanhSachUngVien] = useState([]);
>>>>>>> origin/main

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
