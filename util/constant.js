export const Params = Object.freeze({
    danhSachNhaTuyenDung: 'danh-sach-nha-tuyen-dung',
    danhSachTaiKhoanNhaTuyenDung: 'danh-sach-tai-khoan-nha-tuyen-dung',
    taikhoancuatoi: 'tai-khoan-cua-toi',
    manageApplySlug: {
        ungVienApply: 'view-all-apply',
        nhaTuyenDungDashBoard: 'view-all-dashboard',
    },
});

export const StatusCode = Object.freeze({
    SaiTkOrMk: 401,
    validTkOrMk: 200,
});

export const CodeGender = {
    Nam: 'G1',
    Nu: 'G2',
};

export const roleUser = {
    UngVien: -1,
    NhaTuyenDung: 0,
    Admin: 1,
};

export const typeUngTuyen = {
    delete: 'delete',
    restore: 'restore',
};

export const manageUngTuyen = {
    allUngVien: 1,
    trashUngTuyen: 2,
    showModal: true,
};
