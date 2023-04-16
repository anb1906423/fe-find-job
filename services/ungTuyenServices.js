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
