import {DeleteData, EditData, GLOBALTYPES} from '../constants/globalTypes';
import { deleteDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetch-data-api';
import {createNotification, removeNotification} from '../actions/notificationAction';

export const createComment = ({post, newComment, auth, socket}) => async (dispatch) => {
    const newPost = {...post, comments: [...post.comments, newComment]}
    
    dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost })

    try {
        const data = {...newComment, postId: post._id, postUserId: post.user._id}
        const res = await postDataAPI('comment', data)

        const newData = {...res.data.newComment, user: auth.user}
        const newPost = {...post, comments: [...post.comments, newData]}
        dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost })

        // Socket
        socket.emit('createComment', newPost)

        // Notify
        let newRecipients = [];
        let newText = '';

        if(!newComment.tag && !newComment.reply){
            newRecipients = [post.user._id];
            newText = 'has commented on your post.';
        }else if(newComment.tag && newComment.reply){
            newRecipients = [newComment.tag._id];
            newText = 'mentioned you in a comment.';
        }else if(!newComment.tag && newComment.reply && newComment.selectedUser){
            newRecipients = [newComment.selectedUser._id];
            newText = 'reply you in a comment';
        }
        const message = {
            id: res.data.newComment._id,
            text: newText,
            recipients: newRecipients,
            url: `/profile/${post.user._id}/post?id=${post._id}`,
            content: post.content, 
            image: post.images.length > 0 ? post.images[0].url : ''
        }
        await dispatch(createNotification({message, auth, socket}))

        return res
        
    } catch (err) {
        // dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
        console.log(err.message)
    }
}

export const updateComment = ({comment, post}) => async (dispatch) => {
    const newComments = EditData(post.comments, comment._id, comment)
    const newPost = {...post, comments: newComments}
    
    dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost })
    try {
        patchDataAPI(`comment/${comment._id}`, { content: comment.content, tag: comment.tag })
    } catch (err) {
        console.log(err.message)
    }
}

export const deleteComment = ({post, comment, socket}) => async (dispatch) => {

    const deleteArrFirst = [...post.comments.filter(cm => cm._id === comment._id || cm.reply === comment._id)];

    const deleteArrSecond = [...post.comments.filter(cm => deleteArrFirst.find(item => item._id === cm._id || item._id === cm.reply))];

    const newPost = {
        ...post,
        comments: post.comments.filter(cm => !deleteArrSecond.find(deArSe => deArSe._id === cm._id))
    }
    dispatch({type: GLOBALTYPES.UPDATE_POST, payload: newPost})
    socket.emit('deleteComment', newPost)

    try {
        deleteArrSecond.forEach(item => {
            deleteDataAPI(`comment/${item._id}`);
            
            // let newRecipients = [];
            // let newText = '';

            // if(!item.tag && !item.reply){
            //     newRecipients = [post.user._id];
            //     newText = 'has commented on your post.';
            // }else if(item.tag && item.reply){
            //     newRecipients = [item.tag._id];
            //     newText = 'mentioned you in a item.';
            // }else if(!item.tag && item.reply && item.selectedUser){
            //     newRecipients = [item.selectedUser._id];
            //     newText = 'reply you in a comment';
            // }
            // const message = {
            //     id: item._id,
            //     text: newText,
            //     recipients: newRecipients,
            //     url: `/profile/${post.user._id}/post?id=${post._id}`
            // }

            // dispatch(removeNotification({message, socket}))
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const likeComment = ({comment, post, auth}) => async (dispatch) => {
    const newComment = {...comment, likes: [...comment.likes, auth.user]}

    const newComments = EditData(post.comments, comment._id, newComment)

    const newPost = {...post, comments: newComments}
    console.log(newPost)
    
    dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost })

    try {
        await patchDataAPI(`comment/${comment._id}/like`, null, auth.token)
    } catch (err) {
        console.log(err.message)
        // dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}

export const unLikeComment = ({comment, post, auth}) => async (dispatch) => {

    const newComment = {...comment, likes: DeleteData(comment.likes, auth.user._id)}

    const newComments = EditData(post.comments, comment._id, newComment)

    const newPost = {...post, comments: newComments}
    
    dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost })

    try {
        await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token)
    } catch (err) {
        console.log(err.message)
        // dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}