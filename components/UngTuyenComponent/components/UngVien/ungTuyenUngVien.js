import React, { useEffect } from 'react';
import useGetRoleUser from '../../../../app/hook/useGetRoleUser/useGetRoleUser';
import { roleUser } from '../../../../util/constant';
import { useRouter } from 'next/router';

export default function UngTuyenUngVien() {
    const role = useGetRoleUser();
    const router = useRouter();

    useEffect(() => {
        if (role || role !== roleUser.UngVien) {
            router.push('/404-not-found');
        }
    }, [role]);

    return <div>UngTuyenUngVien</div>;
}
