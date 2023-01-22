import Head from 'next/head';
import React from 'react';
import AdminWebsite from '../../components/adminWebsite/AdminWebsite';

function index(props) {
    return (
        <>
            <Head>
                <title>Chào mừng bạn đến với quản trị viên website</title>
            </Head>
            <div>
                <AdminWebsite />
            </div>
        </>
    );
}

index.propTypes = {};

export default index;
