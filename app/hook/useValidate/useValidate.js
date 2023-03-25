import { swtoast } from '../../../mixins/swal.mixin';
const useValidate = (arrayClone) => {
    let isValid = true;

    for (let i = 0; i < arrayClone.length; i++) {
        if (arrayClone[i] === undefined) {
            arrayClone[i] = '';
        }

        if (arrayClone[i] === '' || arrayClone[i].length === 0) {
            isValid = false;
            swtoast.fire({
                text: 'Vui lòng cung cấp đầy đủ thông tin!',
            });
            break;
        }
    }

    return isValid;
};

export default useValidate;
