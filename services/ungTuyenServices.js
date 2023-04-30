import { data } from 'jquery';
import axios from '../pages/api/axiosResData';

export const sendDataUngTuyen = (data) => {
    return axios.post('/api/v1/ung-tuyen/send-email', data);
};

export const getDataLimitUngTuyen = ({ page = 1, limit = 10, data, typeQuery }) => {
    return axios.post(
        `/api/v1/ung-tuyen/get-all-limit-ung-vien-ung-tuyen?page=${page}&limit=${limit}${
            typeQuery ? `&queryType=${typeQuery}` : ''
        }`,
        data,
    );
};

export const getInfoNhaTuyenDung = (id) => {
    return axios.get(`/nha-tuyen-dung/${id}`);
};

export const deleteOrRestoreUngVien = (data) => {
    return axios.post(`/api/v1/ung-tuyen/trash-ung-vien-ung-tuyen`, data);
};

export const changeCheckNew = (data) => {
    return axios.post(`/api/v1/ung-tuyen/post-check-isNew`, data);
};

export const changeTimeAppointment = (data) => {
    return axios.post(`/api/v1/ung-tuyen/change-time-appointment`, data);
};
