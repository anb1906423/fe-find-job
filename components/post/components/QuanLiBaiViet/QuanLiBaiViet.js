import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import {
    GetAllPostNhaTuyenDung,
    HandleOfState,
    HandleOnState,
    deletePostNhaTuyenDung,
} from '../../../../services/siteServices';
import convertTime from '../../../../app/@func/convertTime/convertTime';
import Tippy from '@tippyjs/react';

export default function QuanLiBaiViet() {
    const [data, setData] = useState([]);
    const UserInfor = useSelector((state) => state.user.userInfo);

    const fetch = async () => {
        try {
            const Res = await GetAllPostNhaTuyenDung(UserInfor?.email);

            if (Res) {
                setData(Res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetch();
    }, [UserInfor?.email]);

    const handleChangeStatus = async (id, type) => {
        console.log('check type :', type === 'false');

        type === 'false' ? await HandleOfState(id) : await HandleOnState(id);

        fetch();
    };

    const handleDeletePost = async (id) => {
        await deletePostNhaTuyenDung(id);

        fetch();
    };

    return (
        <div className="container my-4">
            <h3 className="text-center py-4 title text-uppercase">Quản lí tin</h3>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th className="text-center" scope="col">
                            ID Bài VViết
                        </th>
                        <th className="text-center" scope="col">
                            Thời gian tạo bài viết
                        </th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.length > 0 &&
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td className="text-center">{item?.id}</td>
                                <td className="text-center">{convertTime(item?.created_at)}</td>
                                <td>
                                    <select
                                        onChange={(e) => handleChangeStatus(item?.id, e.target.value)}
                                        value={item?.state}
                                        className="form-control"
                                    >
                                        <option value={true}>Công khai</option>
                                        <option value={false}>Không công khai</option>
                                    </select>
                                </td>
                                <td>
                                    <Tippy content="Xem hoặc sửa bài viết" placement="bottom">
                                        <button
                                            onClick={() => {
                                                Router.push(
                                                    `/post?view-and-edit-post=redirect&id=${item?.id}&type=edit`,
                                                );
                                            }}
                                            className="btn"
                                        >
                                            <i className="bi bi-text-indent-right"></i>
                                        </button>
                                    </Tippy>
                                    <Tippy content="Xóa bài viết" placement="bottom">
                                        <button onClick={() => handleDeletePost(item?.id)} className="btn">
                                            <i className="bi bi-trash2-fill"></i>
                                        </button>
                                    </Tippy>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
