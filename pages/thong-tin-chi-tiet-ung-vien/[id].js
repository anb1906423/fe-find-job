import React from 'react';
import TrangChiTiet from '../../components/TrangChiTiet';
import { backendAPI } from '../../config';
import axios from 'axios';
import { LayThongTinUngVien } from '../../services/siteServices';

function ChiTiet({ dataUngVien }) {
    return (
        <div>
            <TrangChiTiet data={dataUngVien} />
        </div>
    );
}

export async function getStaticPaths() {
    const Res = await axios.get(`${backendAPI}/ung-vien?page=${1}&limit=${100}`);

    const path = Res?.data?.data.map((x) => ({
        params: {
            id: x?.id,
        },
    }));

    return {
        paths: path,
        fallback: true, // can also be true or 'blocking'
    };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
    const Res = await LayThongTinUngVien(context?.params?.id);

    console.log('check REs: ', Res);

    return {
        // Passed to the page component as props
        props: { dataUngVien: Res?.data },
        revalidate: 86400,
    };
}

export default ChiTiet;
