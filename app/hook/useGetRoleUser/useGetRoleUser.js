import React from 'react';
import { useSelector } from 'react-redux';

export default function useGetRoleUser() {
    const role = useSelector((state) => state.user.role);

    return role;
}
