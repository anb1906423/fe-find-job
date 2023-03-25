import { REACT_APP_NAME_UPLOAD_IMAGE } from '../config';
import axios from '../pages/api/axiosApi';

export const UploadImage = (data) => {
    const name = REACT_APP_NAME_UPLOAD_IMAGE;

    return axios.post(`https://api.cloudinary.com/v1_1/${name}/image/upload`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        },
    });
};

export const UngVienLienDeXuat = () => {
    return axios.get('/ung-vien');
};

export const LayThongTinUngVien = (id) => {
    return axios.get(`/ung-vien/${id}`);
};

export const getAllKinhghiem = () => {
    return axios.get('/kinh-nghiem');
};

export const getAllNganhNghe = () => {
    return axios.get('/nganh-nghe');
};

export const getAllViTriMongMuon = () => {
    return axios.get('/cap-bac');
};

export const getAllQuiMo = () => {
    return axios.get('/qui-mo');
};

export const getAllLinhVucKinhDoanh = () => {
    return axios.get('/linh-vuc-kinh-doanh');
};
