import { swtoast } from "../../../mixins/swal.mixin";
const useValidate = (arrayClone) => {
    console.log('check : ', arrayClone);

    let isValid = true;

    for (let i = 0; i < arrayClone.length; i++) {
        if (arrayClone[i] === undefined) {
            arrayClone[i] = '';
        }

        if (arrayClone[i] === '' || arrayClone[i].length === 0) {
            isValid = false;
            swtoast.fire({
                text: "Thông tin tài khoản hoặc mật khẩu không được để trống!"
            })
            break;
        }
    }

    return isValid;
};

export default useValidate;
