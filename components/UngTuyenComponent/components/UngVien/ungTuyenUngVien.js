import React, { useEffect } from 'react';
import useGetRoleUser from '../../../../app/hook/useGetRoleUser/useGetRoleUser';
import { roleUser } from '../../../../util/constant';

export default function UngTuyenUngVien() {
    const role = useGetRoleUser();

    useEffect(() => {
        if (role && role === roleUser.UngVien) {
        }
    }, [role]);

    return <div>UngTuyenUngVien</div>;
}
