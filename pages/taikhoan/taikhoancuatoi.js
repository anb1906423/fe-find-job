import Head from 'next/head';

import MeProfile from '../../components/Taikhoanungvien/me';

const Me = () => {
    return (
        <>
            <Head>
                <title>Tài khoản của bạn</title>
            </Head>
            <MeProfile />
        </>
    );
};

export default Me;
