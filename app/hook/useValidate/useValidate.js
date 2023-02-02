const useValidate = (arrayClone) => {
    console.log('check : ', arrayClone);

    let isValid = true;

    for (let i = 0; i < arrayClone.length; i++) {
        if (arrayClone[i] === '' || arrayClone[i].length === 0) {
            isValid = false;
            alert('Bạn đã nhập thiếu trường !');
            break;
        }
    }

    return isValid;
};

export default useValidate;
