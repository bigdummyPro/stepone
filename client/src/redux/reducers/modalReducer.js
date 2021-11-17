import { GLOBALTYPES } from "../constants/globalTypes";
// import { LOCALTYPES } from "../constants/localTypes";

const initialState = {
    createPostModalStatus: false,
    emotionModalInCreatePost: false,
    emotionModalPosition: {x: 0, y: 0},
    fileModalInCreatePost: false,
    initFileModalType: null
};

const modalReducer = (state = initialState, action) => {
    const {payload, type} = action; 
    switch (type) {
        case GLOBALTYPES.CREATE_POST_MODAL_STATUS:
            return {...state, createPostModalStatus: payload};
        case GLOBALTYPES.EMOTION_MODAL_IN_CREATE_POST:
            return {...state, emotionModalInCreatePost: payload};
        case GLOBALTYPES.EMOTION_MODAL_POSITION:
            return {...state, emotionModalPosition: {x: payload.x, y: payload.y}}
        case GLOBALTYPES.FILE_MODAL_IN_CREATE_POST:
            return {...state, fileModalInCreatePost: payload}
        case GLOBALTYPES.INIT_FILE_MODAL_TYPE:
            return {...state, initFileModalType: payload}
        default:
            return state;
    }
}

export default modalReducer;