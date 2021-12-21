import { GLOBALTYPES } from "../constants/globalTypes";

const onlineReducer = (state = [], action) => {
    switch (action.type) {
        case GLOBALTYPES.SET_ONLINE:
            return [...state, action.payload];
        case GLOBALTYPES.SET_OFFLINE:
            return state.filter(item => item !== action.payload);
        default:
            return state;
    }
}

export default onlineReducer;