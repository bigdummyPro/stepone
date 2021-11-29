import { GLOBALTYPES } from "../constants/globalTypes";

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.SET_AUTH:
            return action.payload;
    
        default:
            return state;
    }
}

export default authReducer;