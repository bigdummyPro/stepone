const { GLOBALTYPES, DeleteData } = require("../constants/globalTypes");

const initialState = {
    userStorage: {},
    conversations: [],
    data: [],
    firstLoad: false
}

const messageReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GLOBALTYPES.SET_USER_STORAGE:
            return {
                ...state,
                userStorage: payload
            }
        case GLOBALTYPES.CREATE_MESSAGE:

            let newConversations = [];
            let newData = [];

            let convID = '';

            if(payload.convType === 'personal'){
                convID = payload.recipients.filter(item => item._id !== payload.user._id)[0]._id;
            }else{
                convID = payload._convID;
            }
            if(state.conversations.every(item => item._id !== convID)){
                newConversations = [{
                    _id: convID, 
                    text: payload.text, 
                    currentSender: payload.sender,
                    isRead: [payload.sender],
                    media: payload.media, 
                    recipients: payload.recipients.filter(item => item._id !== payload.user._id), 
                    convType: 'personal'
                }, ...state.conversations];

                newData = [...state.data, {result: 1, messages: [payload], _id: convID}];
            }else{
                newConversations = state.conversations.map(conv => (
                    conv._id === convID ? 
                    {
                        ...conv,
                        text: payload.text,
                        currentSender: payload.sender,
                        isRead: [payload.sender],
                        recipients: payload.recipients.filter(item => item._id !== payload.user._id),
                        media: payload.media,
                        updatedAt: payload.updatedAt
                    } : conv
                ))
                //sort by updateAt
                newConversations = sortConvWhenAddMess(newConversations, convID);
                //end sort

                if(state.data.some(item => item._id === convID)){
                    newData = state.data.map(data => (
                        data._id === convID ?
                        {
                            ...data,
                            messages: [...data.messages, payload],
                            result: data.result + 1
                        } : data
                    ))
                }else if(state.data.every(item => item._id !== convID)){
                    newData = [...state.data, {result: 1, messages: [payload], _id: convID}];
                }
            }
            return {
                ...state,
                conversations: newConversations,
                data: newData
            }
        case GLOBALTYPES.DELETE_MESSAGE:
            return {
                ...state,
                data: state.data.map(item => 
                    item._id === payload.convID ? 
                    {...item, messages: DeleteData(item.messages, payload.messID)} : item
                )
            }
        case GLOBALTYPES.GET_CONVERSATIONS:
            return {
                ...state,
                conversations: payload.newConversation,
                firstLoad: true
            }
        case GLOBALTYPES.GET_MESSAGES:
            return {
                ...state,
                data: state.data.every(item => item._id !== payload._id) ? 
                [...state.data, payload] : state.data
            }
        case GLOBALTYPES.CREATE_CONVERSATION:
            return {
                ...state,
                conversations: [ {
                    ...payload, recipients: payload.recipients.filter(item => item._id !== payload.user._id)
                },...state.conversations]
            }
        case GLOBALTYPES.UPDATE_CONVERSATION:
            let newUpdateConversations = [];
            if(state.conversations.every(item => item._id !== payload._id)){
                newUpdateConversations = [ {
                    ...payload, recipients: payload.recipients.filter(item => item._id !== payload.user._id)
                },...state.conversations]
            }else if(state.conversations.some(item => item._id === payload._id)){
                newUpdateConversations = state.conversations.map(conv => (
                    conv._id === payload._id ? 
                    {
                        ...conv,
                        recipients: payload.recipients.filter(item => item._id !== payload.user._id),
                        convName: payload.convName,
                        convAvatar: payload.convAvatar,
                        updatedAt: payload.updatedAt,
                        noActiveStatus: false
                    } : conv
                ))
            }
            return {
                ...state,
                conversations: newUpdateConversations
            }
        case GLOBALTYPES.UPDATE_ISREAD_CONVERSATION:
            let newUpdateIsReadConv = state.conversations.map(conv => (
                conv._id === payload._id ? 
                {
                    ...conv,
                    isRead: [...conv.isRead, payload.user]
                } : conv
            ))
            return {
                ...state,
                conversations: newUpdateIsReadConv
            }
        case GLOBALTYPES.DELETE_CONVERSATION:
            return {
                ...state,
                conversations: DeleteData(state.conversations, payload),
                data: DeleteData(state.data, payload)
            }
        case GLOBALTYPES.SET_NO_ACTIVE_USER:
            return {
                ...state,
                conversations: state.conversations.map(conv => (
                    conv._id === payload._id ? 
                    {
                        ...conv,
                        noActiveStatus: true
                    } : conv
                ))
            }
        case GLOBALTYPES.CHECK_ONLINE_OFFLINE:
            let newConvWithStatus = [];

            state.conversations.forEach(conv => {
                if(conv.convType === 'personal'){
                    if(action.payload.includes(conv.recipients[0]._id)) 
                        newConvWithStatus.push({...conv, online: true})
                    else 
                        newConvWithStatus.push({...conv, online: false})
                }

                if(conv.convType === 'group'){
                    if(conv.recipients.some(item => action.payload.includes(item._id)))
                        newConvWithStatus.push({...conv, online: true})
                    else if(conv.recipients.every(item => !action.payload.includes(item._id)))
                        newConvWithStatus.push({...conv, online: false})
                }
            })
            return {
                ...state,
                conversations: newConvWithStatus
            }
        default:
            return state;
    }
}

const sortConvWhenAddMess = (conversations, id) => {
    const newConversations = [...conversations];

    const fromIndex = newConversations.findIndex(item => item._id === id);
    const elementClone = newConversations[fromIndex];

    newConversations.splice(fromIndex, 1);
    newConversations.splice(0, 0, elementClone);

    return newConversations
}

export default messageReducer;