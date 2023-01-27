const initialState = {
    isLoggedIn: false,
    userInfo: null,
    userPersist: null,
    role: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default userReducer;
