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
