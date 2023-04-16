import { useRouter } from 'next/router';
import React from 'react';
import { Params } from '../../util/constant';
import UngTuyenUngVien from '../../components/UngTuyenComponent/components/UngVien/ungTuyenUngVien';

export default function ManageApply() {
    const router = useRouter();

    return (
        <div
            style={{
                minHeight: '60vh',
            }}
        >
            {router?.query.slug === Params.manageApplySlug.ungVienApply && <UngTuyenUngVien />}
        </div>
    );
}
