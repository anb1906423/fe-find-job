import React, { useEffect } from 'react';
import useGetRoleUser from '../../../../app/hook/useGetRoleUser/useGetRoleUser';

export default function UngTuyenUngVien() {
    const role = useGetRoleUser();

    return <div>UngTuyenUngVien</div>;
}
