const { GLOBALTYPES, EditData } = require("../constants/globalTypes");

const initialState = {
    loading: false,
    data: [],
    sound: false
}

const notificationReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GLOBALTYPES.GET_NOTIFICATIONS:
            return {
                ...state,
                data: payload
            };
        case GLOBALTYPES.CREATE_NOTIFICATION:
            return {
                ...state,
                data: [payload, ...state.data]
            };
        case GLOBALTYPES.REMOVE_NOTIFICATION:
            return {
                ...state,
                data: state.data.filter(item => (
                    item.id !== payload.id || item.url !== payload.url
                ))
            };
        case GLOBALTYPES.UPDATE_NOTIFICATION:
            return {
                ...state,
                data: EditData(state.data, payload._id, payload)
            };
        case GLOBALTYPES.UPDATE_NOTIFICATION_SOUND:
            return {
                ...state,
                sound: payload
            };
        case GLOBALTYPES.REMOVE_ALL_NOTIFICATION:
            return {
                ...state,
                data: payload
            };
        default:
            return state;
    }
}

export default notificationReducer;