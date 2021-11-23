import { GLOBALTYPES } from "../constants/globalTypes";

const initialState = {
    emotionModalStatus: false,
    emotionValue: '',
    toggleIconEl: '',
    textareaEl: '',
    emotionChange: true
}
const emotionModalReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GLOBALTYPES.OPEN_EMOTION_MODAL:
            return {...state, emotionModalStatus: true}
        case GLOBALTYPES.CLOSE_EMOTION_MODAL:
            return {...state, emotionModalStatus: false}
        case GLOBALTYPES.SET_EMOTION_VALUE:
            return {...state, emotionValue: payload}
        case GLOBALTYPES.SET_TOGGLE_ICON_EL:
            return {...state, toggleIconEl: payload}
        case GLOBALTYPES.SET_TEXTAREA_EL:
            return {...state, textareaEl: payload}
        case GLOBALTYPES.SET_EMOTION_CHANGE:
            return {...state, emotionChange: payload}
        default:
            return state;
    }
}

export default emotionModalReducer;