import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    userPersist: null,
    role: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_OR_REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                userPersist: action.userInfo,
                role: action.userInfo.role,
            };
        // case actionTypes.UPDATE_USER_SUCCESS:
        //     return {
        //         ...state,
        //         userInfo: action.data,
        //     };
        // case actionTypes.USER_LOGIN_FAIL:
        //     return {
        //         ...state,
        //         isLoggedIn: false,
        //         userInfo: null,
        //     };
        // case actionTypes.PROCESS_LOGOUT:
        //     return {
        //         ...state,
        //         isLoggedIn: false,
        //         userInfo: null,
        //         token: null,
        //     };

        default:
            return state;
    }
};

export default userReducer;
