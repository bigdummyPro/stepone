import { EditData, GLOBALTYPES } from "../constants/globalTypes";

const initialState = {
    loading: false,
    ids: [],
    users: [],
    posts: []
} 

const profileReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GLOBALTYPES.SET_IDS:
            return {
                ...state,
                ids: [...state.ids, payload]
            }
        case GLOBALTYPES.LOADING_PROFILE:
            return {
                ...state,
                loading: payload
            }
        case GLOBALTYPES.SET_USERS_INFO:
            return {
                ...state,
                users:[...state.users, payload.user]
            }
        case GLOBALTYPES.FOLLOW:
            return {
                ...state,
                users: EditData(state.users, payload._id, payload)
            };
        case GLOBALTYPES.UNFOLLOW:
            return {
                ...state,
                users: EditData(state.users, payload._id, payload)
            };
        default:
            return state;
    }
}

export default profileReducer;