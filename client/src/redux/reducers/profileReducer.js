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
        case GLOBALTYPES.GET_PROFILE_POSTS:
            return {
                ...state,
                posts: [...state.posts, payload]
            };
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
        case GLOBALTYPES.UPDATE_POST: 
            const postState = [...state.posts];
            const newPost = postState.find(item => item._id === payload.user._id);

            if(newPost){
                const newPostUpdate = {...newPost, posts: EditData(newPost.posts, payload._id, payload)};
    
                return {
                    ...state,
                    posts: EditData(state.posts, newPostUpdate._id, newPostUpdate)
                }
            }else{
                return {
                    ...state,
                    posts: []
                }
            }
        default:
            return state;
    }
}

export default profileReducer;