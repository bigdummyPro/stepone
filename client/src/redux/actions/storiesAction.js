import { getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetch-data-api"
import { GLOBALTYPES } from "../constants/globalTypes"


export const createStories = ({background, content, fontStyle, user}) => async dispatch =>{
    try {
        const res = await postDataAPI('stories/', {background, content, fontStyle, user: user._id})
        
        if(res.data.success){
            dispatch({type: GLOBALTYPES.CREATE_STORIES, payload: res.data.stories})
        }
        return res
    } catch (error) {
        console.log(error.message)
    }
}

export const getStories = () => async dispatch => {
    try {
        const res = await getDataAPI('stories');
        if(res.data.success){
            dispatch({type: GLOBALTYPES.GET_STORIES, payload: res.data.stories})
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const getStoriesById = () => async dispatch => {
    try {
        const res = await getDataAPI('stories/get-stories-by-id');
        if(res.data.success){
            dispatch({type: GLOBALTYPES.GET_STORIES_BY_ID, payload: res.data.stories})
        }
    } catch (error) {
        console.log(error.message)
    }
}
export const updateStoriesLike = ({id, user, emotionType}) => async dispatch => {
    try {
        const res = await patchDataAPI(`stories/update-like/${id}`, {emotionType});
        dispatch({type: GLOBALTYPES.UPDATE_STORIES_LIKE, payload: {
            id, user, emotionType
        }})
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export const updateStoriesViewer = ({id, user}) => async dispatch => {
    dispatch({type: GLOBALTYPES.UPDATE_STORIES_VIEWER, payload: {
        id, user
    }})
    try {
        const res = await patchDataAPI(`stories/update-viewer/${id}`, null);
        return res;
    } catch (error) {
        console.log(error.message)
    }
}