import {getDataAPI, patchDataAPI, postDataAPI} from '../../utils/fetch-data-api';
import { GLOBALTYPES } from '../constants/globalTypes';

export const getConversations = ({auth, page = 1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`message/conversations?limit=${page * 9}`)
        
        let newConversation = [];
        res.data.conversations.forEach(item => {
            const newRecipients = item.recipients.filter(item => item._id !== auth.user._id);
            newConversation.push({
                ...item,
                _id: item.convType === 'group' ? item._id : newRecipients[0]._id,
                recipients: newRecipients, 
            })
        })

        dispatch({
            type: GLOBALTYPES.GET_CONVERSATIONS, 
            payload: {newConversation, result: res.data.result}
        })

    } catch (err) {
        // dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        console.log(err);
    }
}

export const getMessages = ({id, page = 1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`message/get-mess-by-conversation/${id}?limit=${page * 20}`)
        const newData = {...res.data, messages: res.data.messages.reverse()}
        
        if(res.data.messages.length > 0){
            dispatch({type: GLOBALTYPES.GET_MESSAGES, payload: {...newData, _id: id, page}})
        }
    } catch (err) {
        // dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        console.log(err);
    }
}

export const createMessage = ({message, auth, socket}) => async (dispatch) =>{
    dispatch({type: GLOBALTYPES.CREATE_MESSAGE, payload: {...message, user: auth.user}})

    socket.emit('addMessage', message)
    
    try {
        const newRecipients = []
        message.recipients.forEach(item => {
            if(item._id !== auth.user._id) newRecipients.push(item._id);
        });
        const res = await postDataAPI(`message`, {...message, recipients: newRecipients, sender: message.sender._id});

        return res;
    } catch (err) {
        // dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        console.log(err.message)
    }
}

export const createConversation = ({conversation, auth, socket}) => async (dispatch) => {

    try {
        const res = await postDataAPI('message/conversation', conversation);
        if(res.data.success){
            dispatch({type: GLOBALTYPES.CREATE_CONVERSATION, payload: {...res.data.newConversation, user: auth.user}});
            socket.emit('addConvGroup', res.data.newConversation)
        }
        return res;
    } catch (error) {
        console.log(error.message);
    }
}

export const updateConversation = ({conversation, auth, socket, noActiveData}) => async (dispatch) => {
    try {
        const res = await patchDataAPI(`message/conversation/${conversation._id}`, conversation);
        if(res.data.success){
            dispatch({type: GLOBALTYPES.UPDATE_CONVERSATION, payload: {
                ...res.data.newConversation,
                user: auth.user
            }})
            socket.emit('updateConvGroup', res.data.newConversation)

            if(noActiveData.noActiveUser) socket.emit('preventUser', noActiveData)
        }
        return res;
    } catch (error) {
        console.log(error.message)
    }
}

export const isReadUpdate = ({conversationID, auth}) => async dispatch => {
    dispatch({type: GLOBALTYPES.UPDATE_ISREAD_CONVERSATION, payload: {
        user: {
            _id: auth.user._id, 
            userName: auth.user.username,
            nickname: auth.user.nickname,
            avatar: auth.user.avatar
        }, _id: conversationID
    }})
    try {
        await patchDataAPI(`message/conversation/isRead/${conversationID}`, null)
    } catch (err) {
        console.log(err.message)
        // dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.message}})
    }
}