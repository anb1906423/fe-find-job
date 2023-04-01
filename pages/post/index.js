import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import dynamic from 'next/dynamic';

const PostComponent = dynamic(() => import('../../components/post/PostComponent'), {
    ssr: false,
});

export default function Post() {
    const role = useSelector((state) => state.user.role);

    useEffect(() => {
        if (role !== 0) {
            Router.push('/');
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