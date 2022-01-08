import { DeleteData, EditData, GLOBALTYPES } from "../constants/globalTypes";

const initialState = {
    loading: false,
    posts: [],
    result: 0,
    page: 0
}

const postReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case GLOBALTYPES.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            };
        case GLOBALTYPES.GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                page: action.payload.page
            };
        case GLOBALTYPES.UPDATE_POST:
            return {
                ...state,
                posts: EditData(state.posts, action.payload._id, action.payload)
            };
        case GLOBALTYPES.DELETE_POST:
            return {
                ...state,
                posts: DeleteData(state.posts, action.payload._id)
            };
        default:
            return state;
    }
}

export default postReducer;