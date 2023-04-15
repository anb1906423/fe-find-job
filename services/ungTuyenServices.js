import axios from '../pages/api/axiosResData';

export const sendDataUngTuyen = (data) => {
    return axios.post('/api/v1/ung-tuyen/send-email', data);
};
