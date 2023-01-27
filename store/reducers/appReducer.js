const initContentOfConfirmModal = {
    isOpen: false,
    messageId: '',
    handleFunc: null,
    dataFunc: null,
};

const initialState = {
    started: true,
    language: 'vi',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal,
    },
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default appReducer;
