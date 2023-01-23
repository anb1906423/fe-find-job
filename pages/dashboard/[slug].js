import Head from 'next/head';
import React from 'react';
import Dashboard from '../../components/dashboard/dashboard';

function index(props) {
    return (
        <>
            <Head>
                <title>Chào mừng bạn đến với quản trị viên website</title>
            </Head>
            <div>
                <Dashboard />
            </div>
        </>
    );
}

index.propTypes = {};

export default index;
