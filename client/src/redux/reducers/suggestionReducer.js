import { GLOBALTYPES } from "../constants/globalTypes";


const initialState = {
    loading: false,
    users: []
}

const suggestionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.LOADING_SUGGESTION:
            return {...state, loading: action.payload}
        case GLOBALTYPES.GET_USERS_SUGGESTION:
            return {...state, users: action.payload.users}
        default:
            return state;
    }
}

export default suggestionReducer;