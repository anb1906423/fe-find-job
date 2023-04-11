import Head from 'next/head';
import React from 'react';
import Dashboard from '../../components/dashboard/dashboard';

function index(props) {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div>
                <Dashboard />
            </div>
        </>
    );
}

index.propTypes = {};

export default index;
