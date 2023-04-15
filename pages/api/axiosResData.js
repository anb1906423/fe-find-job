import axios from 'axios';

import { backendAPI } from '../../config';

const instance = axios.create({
    baseURL: backendAPI,
    // withCredentials: true,
});

instance.interceptors.response.use((response) => {
    // Thrown error for request with OK status code

    const { data } = response;

    return data;
});

export default instance;
