import {EditData, GLOBALTYPES} from '../constants/globalTypes';
import { patchDataAPI, postDataAPI } from '../../utils/fetch-data-api';
import {createNotification} from '../actions/notificationAction';

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
        }else if(!newComment.tag && newComment.reply){
            newRecipients = [newComment.selectedUser._id];
            newText = 'reply you in a comment';
        }
        const message = {
            id: res.data.newComment._id,
            text: newText,
            recipients: newRecipients,
            url: `/profile/${auth.user._id}/post?id=${post._id}`,
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

export const updateComment = ({comment, post, content, auth}) => async (dispatch) => {
    const newComments = EditData(post.comments, comment._id, {...comment, content})
    const newPost = {...post, comments: newComments}
    
    dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost })
    try {
        patchDataAPI(`comment/${comment._id}`, { content }, auth.token)
    } catch (err) {
        // dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
        console.log(err.message)
    }
}