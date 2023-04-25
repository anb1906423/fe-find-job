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

export const UngVienLienDeXuat = (page, limit) => {
    return axios.get(`/ung-vien?page=${page}&limit=${limit}`);
};

export const LayThongTinUngVien = (id) => {
    return axios.get(`/ung-vien/${id}`);
};

export const DoiMatKhauUngVien = (id, data) => {
    return axios.put(`/ung-vien/doi-mat-khau/${id}`, data);
};

export const DoiMatKhauNhaTuyenDung = (id, data) => {
    return axios.put(`/nha-tuyen-dung/doi-mat-khau/${id}`, data);
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

export const getAllBangCap = () => {
    return axios.get('/bang-cap');
};

export const getAllMucLuong = () => {
    return axios.get('/muc-luong');
};

export const getAllLoaiHopDong = () => {
    return axios.get('/loai-hop-dong');
};

export const getAllDiaDiemLamViec = () => {
    return axios.get('/dia-diem-lam-viec');
};

// cong viec ( dang bai tuyen dung )

export const createNewPost = (data) => {
    return axios.post(`/cong-viec/create`, data);
};

export const HandleOnState = (cong_viec_id) => {
    return axios.put(`/cong-viec/on`, {
        cong_viec_id,
    });
};

export const HandleOfState = (cong_viec_id) => {
    return axios.put(`/cong-viec/off`, {
        cong_viec_id,
    });
};

export const GetAllPostNhaTuyenDung = (email) => {
    return axios.get(`/cong-viec/bai-dang-cong-ty?emailcty=${email}`);
};

export const deletePostNhaTuyenDung = (id) => {
    return axios.delete(`/cong-viec/delete/${id}`);
};

export const getPostData = (id) => {
    return axios.get(`/cong-viec/${id}`);
};

export const updatePostNhaTuyenDung = (id, data) => {
    return axios.put(`/cong-viec/update/${id}`, data);
};

export const GetPostNhaTuyenDungByType = (type = 'all', id) => {
    if (type === 'all') {
        return axios.get(`/nha-tuyen-dung`);
    } else {
        return axios.get(`/nha-tuyen-dung/${id}`);
    }
};
