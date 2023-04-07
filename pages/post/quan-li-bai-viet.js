import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const QuanLiBaiViet = dynamic(() => import('../../components/post/components/QuanLiBaiViet/QuanLiBaiViet'), {
    ssr: false,
});

export default function QLBV() {
    const role = useSelector((state) => state.user.role);

    useEffect(() => {
        if (role !== 0) {
            Router.push('/404-not-found');
        } else {
            document.title = 'Đăng bài tuyển dụng';
        }
    }, [role]);

    return (
        <div
            style={{
                minHeight: '50vh',
            }}
        >
            <QuanLiBaiViet />
        </div>
    );
}

// QLBV = quan li bai viet
