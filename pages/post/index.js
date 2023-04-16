import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { roleUser } from '../../util/constant';

const PostComponent = dynamic(() => import('../../components/post/PostComponent'), {
    ssr: false,
});

export default function Post() {
    const role = useSelector((state) => state.user.role);

    useEffect(() => {
        if (role !== roleUser.NhaTuyenDung) {
            Router.push('/404-not-found');
        } else {
            document.title = 'Đăng bài tuyển dụng';
        }
    }, [role]);

    return (
        <div
            style={{
                minHeight: '60vh',
            }}
        >
            <PostComponent />
        </div>
    );
}
