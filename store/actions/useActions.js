import actionTypes from './actionTypes';

export const userLoginSuccess = (userInfo) => {
    console.log(userInfo);

    return {
        type: actionTypes.LOGIN_OR_REGISTER_SUCCESS,
        userInfo, // ES6 <=> userInfo: userInfo
    };
};

export const userLogOut = () => {
    return {
        type: actionTypes.USER_LOGOUT_SUCCESS,
    };
};
