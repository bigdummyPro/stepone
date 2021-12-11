import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetch-data-api';
import { createNotification, removeNotification } from './notificationAction';
import { imageUpload } from '../../utils/image-upload';
import { GLOBALTYPES } from '../constants/globalTypes';


export const createPost = ({content, images, videos, audios, auth, socket}) => async (dispatch) => {
    let image_media = [];
    let video_media = [];
    let audio_media = [];
    try {
        // dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(images.length > 0) image_media = await imageUpload(images);
        if(videos.length > 0) video_media = await imageUpload(videos);
        if(audios.length > 0) audio_media = await imageUpload(audios);

        const res = await postDataAPI('post', { content, images: image_media, videos: video_media, audios: audio_media })

        dispatch({ 
            type: GLOBALTYPES.CREATE_POST, 
            payload: {...res.data.newPost, user: auth.user} 
        })

        // dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })

        //Notify
        const message = {
            id: res.data.newPost._id,
            text: 'added a new post.',
            recipients: auth.user.followers.map(item => item._id),
            url: `/profile/${auth.user._id}/post?id=${res.data.newPost._id}`,
            content, 
            image: image_media.length > 0 ? image_media[0].url : ''
        }
        dispatch(createNotification({message, auth, socket}))

        return res;
    } catch (err) {
        console.log(err.message)
        // dispatch({
        //     type: GLOBALTYPES.ALERT,
        //     payload: {error: err.response.data.msg}
        // })
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING_POST, payload: true })
        const res = await getDataAPI('post')
        
        dispatch({
            type: GLOBALTYPES.GET_POSTS,
            payload: {...res.data, page: 2}
        })

        dispatch({ type: GLOBALTYPES.LOADING_POST, payload: false })
    } catch (err) {
        console.log(err.message);
        // dispatch({
        //     type: GLOBALTYPES.ALERT,
        //     payload: {error: err.response.data.msg}
        // })
    }
}
export const likePost = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: [...post.likes, auth.user]}
    dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost})

    socket.emit('likePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/like`, null)
        
        // Notify
        const message = {
            id: auth.user._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/profile/${auth.user._id}/post?id=${post._id}`,
            content: post.content, 
            image: post.images.length > 0 ? post.images[0].url : ''
        }

        dispatch(createNotification({message, auth, socket}))

    } catch (err) {
        console.log(err.message)
        // dispatch({
        //     type: GLOBALTYPES.ALERT,
        //     payload: {error: err.response.data.msg}
        // })
    }
}

export const unLikePost = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.user._id)}
    dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost})

    socket.emit('unLikePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null)

        // Notify
        const message = {
            id: auth.user._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/profile/${auth.user._id}/post?id=${post._id}`,
        }
        dispatch(removeNotification({message, auth, socket}))

    } catch (err) {
        console.log(err.message)
        // dispatch({
        //     type: GLOBALTYPES.ALERT,
        //     payload: {error: err.response.data.msg}
        // })
    }
}
export const deletePost = ({post, auth, socket}) => async (dispatch) => {
    dispatch({ type: GLOBALTYPES.DELETE_POST, payload: post })

    try {
        await deleteDataAPI(`post/${post._id}`)

        // Notify
        const message = {
            id: post._id,
            text: 'added a new post.',
            recipients: auth.user.followers.map(item => item._id),
            url: `/post/${post._id}`,
        }
        dispatch(removeNotification({message, socket}))
        
    } catch (err) {
        console.log(err.message)
        // dispatch({
        //     type: GLOBALTYPES.ALERT,
        //     payload: {error: err.response.data.msg}
        // })
    }
}
export const getPost = ({id}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`post/${id}`)
        dispatch({ type: GLOBALTYPES.GET_POST, payload: res.data.post })
    } catch (err) {
        console.log(err.message)
        // dispatch({
        //     type: GLOBALTYPES.ALERT,
        //     payload: {error: err.response.data.msg}
        // })
    }
}