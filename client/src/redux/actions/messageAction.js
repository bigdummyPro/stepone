import {getDataAPI} from '../../utils/fetch-data-api';
import { GLOBALTYPES } from '../constants/globalTypes';

export const getConversations = ({auth, page = 1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`message/conversations?limit=${page * 9}`)
        
        let newConversation = [];
        res.data.conversations.forEach(item => {
            const newRecipients = item.recipients.filter(item => item._id !== auth.user._id);
            newConversation.push({
                _id: item.convType === 'group' ? item._id : newRecipients[0]._id,
                convType: item.convType,
                recipients: newRecipients, 
                convName: item.convName,
                convAvatar: item.convAvatar,
                text: item.text, 
                media: item.media
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
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`)
        const newData = {...res.data, messages: res.data.messages.reverse()}

        dispatch({type: GLOBALTYPES.GET_MESSAGES, payload: {...newData, _id: id, page}})
    } catch (err) {
        // dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        console.log(err);
    }
}