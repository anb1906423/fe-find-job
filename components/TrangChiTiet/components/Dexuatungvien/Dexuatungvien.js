import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import LazyImg from '../../../../app/components/LazyImg/LazyImg';
import { UngVienLienDeXuat } from '../../../../services/siteServices';
import { useState } from 'react';
import { memo } from 'react';

function Dexuatungvien({ params, cx = () => {}, handleClick = () => {} }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const Res = await UngVienLienDeXuat();

                // ES6
                const { data } = Res;

                /* 

                [array].reverse() nó sẽ đảo lộn thứ tự những phần tử có trong mảng
                 
                Ta sẽ xóa đi người đang hiển thị bên ngoài
                
                */

                if (!params || !params.query || !params.query.id) return;

                const idViewer = params.query.id;

                // chỉ lấy những ứng viên có id khác với ứng viên đang được xem thông tin<3
                const dataBuild = data.filter((item) => item.id !== idViewer);

                setData(dataBuild.reverse());
            } catch (error) {
                console.log(error);
            }
        };

        fetch();
    }, []);

    /* 
    
        Ta nên check array có rỗng hay không rồi ta mới render

    */

    return (
        <>
            {data &&
                data.length > 0 &&
                data.map((item) => {
                    const id = uuidv4();

                    return (
                        <div className={cx('suggest-ung-vien')} key={id} onClick={() => handleClick(item.id)}>
                            <div className={cx('item-result-ung-vien')}>
                                <div className={cx('anh-ung-vien-de-xuat')}>
                                    <LazyImg
                                        link={
                                            item.avatar
                                                ? item.avatar
                                                : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png'
                                        }
                                        alt={item.hoVaTen}
                                    />
                                </div>
                                <div className={cx('thong-tin-ung-vien-de-xuat')}>
                                    <h5>{item.viTriMongMuon ? item.viTriMongMuon : 'Đang cập nhật'}</h5>
                                    <p className={cx('ten-ung-vien')}>{item.hoVaTen}</p>
                                    <p className={cx('trinh-do-va-kinh-nghiem')}>
                                        <span className={cx('trinh-do', 'chung-css')}>
                                            <i className="bi bi-folder2-open"></i>
                                            {item.hocVan ? item.hocVan : 'Đang cập nhật'}
                                        </span>
                                        <span className={cx('kinh-nghiem', 'chung-css')}>
                                            <i className="bi bi-star"></i>
                                            {item.kinhNghiem ? item.kinhNghiem : 'Đang cập nhật'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
}

Dexuatungvien.propTypes = {
    cx: PropTypes.func,
    handleClick: PropTypes.func,
};

export default memo(Dexuatungvien);
