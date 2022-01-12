import { DeleteData, GLOBALTYPES } from "../constants/globalTypes";

const initialState = {
    authStories: [],
    otherStories: []
}

const storiesReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GLOBALTYPES.CREATE_STORIES:
            return {
                ...state,
                authStories: [payload, ...state.authStories].slice(0, 10)
            };
        case GLOBALTYPES.GET_STORIES_BY_ID:
            return {
                ...state,
                authStories: payload
            }
        case GLOBALTYPES.GET_STORIES:
            return {
                ...state,
                otherStories: payload
            }
        case GLOBALTYPES.UPDATE_STORIES_LIKE:
            const otherStoriesStorage = [...state.otherStories];

            let story = {};

            otherStoriesStorage.forEach(item => item.forEach(item2 => {
                if(item2._id === payload.id){
                    story = item2;
                    return;
                }
            })) 


            let newOtherStories = []

            if(!story) return {...state};

            if(story.likeIds.some(like => like.user._id === payload.user._id)){
                const newLikeIds = story.likeIds.map(like => {
                    if(like.user._id === payload.user._id) return {
                        user: payload.user,
                        emotionType: payload.emotionType
                    }
                    else return like
                })
                newOtherStories = otherStoriesStorage.map(item => {
                    return item.map(item2 => {
                        if(item2._id === payload.id) return {
                            ...item2,
                            likeIds: newLikeIds
                        }
                        else return item2
                    })
                })
            }else{
                newOtherStories = otherStoriesStorage.map(item => {
                    return item.map(item2 => {
                        if(item2._id === payload.id) return {
                            ...item2,
                            likeIds: [...item2.likeIds, {
                                user: payload.user,
                                emotionType: payload.emotionType
                            }]
                        }
                        else return item2
                    })
                })
            }
            return {
                ...state,
                otherStories: newOtherStories
            }
        case GLOBALTYPES.UPDATE_STORIES_VIEWER:
            
            return {
                ...state,
                otherStories: [...state.otherStories].map(item => {
                    return item.map(item2 => {
                        if(item2._id === payload.id){
                            return {
                                ...item2,
                                viewerIds: [...item2.viewerIds, payload.user]
                            }
                        }
                        else return item2
                    })
                })
            }
        case GLOBALTYPES.DELETE_STORIES:
            return {
                ...state,
                authStories: DeleteData(state.authStories, payload)
            }
        default:
            return state;
    }
}

export default storiesReducer;