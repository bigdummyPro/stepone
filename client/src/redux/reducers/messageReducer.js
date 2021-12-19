const { GLOBALTYPES } = require("../constants/globalTypes");

const initialState = {
    userStorage: {},
    conversations: [],
    data: []
}

const messageReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GLOBALTYPES.SET_USER_STORAGE:
            return {
                ...state,
                userStorage: payload
            }
        case GLOBALTYPES.CREATE_MESSAGE:console.log('check 06')

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
                    _id: payload._convID, 
                    text: payload.text, 
                    currentSender: payload.sender,
                    media: payload.media, 
                    recipients: payload.recipients.filter(item => item._id !== payload.user._id), 
                    convType: 'personal'
                }, ...state.conversations];
                //sort by updateAt
                // newConversations = sortConvWhenAddMess(newConversations)
                    // const fromIndex = newConversations.length - 1;
                    // const elementClone = newConversations[fromIndex];

                    // newConversations.splice(fromIndex, 1);
                    // newConversations.splice(0, 0, elementClone);
                //end sort

                newData = [...state.data, {result: 1, messages: [payload], _id: convID}];
            }else{
                newConversations = state.conversations.map(conv => (
                    conv._id === convID ? 
                    {
                        ...conv,
                        text: payload.text,
                        currentSender: payload.sender,
                        recipients: payload.recipients.filter(item => item._id !== payload.user._id),
                        media: payload.media,
                        updatedAt: payload.updatedAt
                    } : conv
                ))
                //sort by updateAt
                newConversations = sortConvWhenAddMess(newConversations, convID);
                    // const fromIndex = newConversations.findIndex(conv => conv._id === payload._convID);
                    // const elementClone = newConversations[fromIndex];

                    // newConversations.splice(fromIndex, 1);
                    // newConversations.splice(0, 0, elementClone);
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
                }else{
                    newData = [...state.data, {result: 1, messages: [payload], _id: convID}];
                }
            }
            return {
                ...state,
                conversations: newConversations,
                data: newData
            };
        case GLOBALTYPES.GET_CONVERSATIONS:
            return {
                ...state,
                conversations: payload.newConversation
            }
        case GLOBALTYPES.GET_MESSAGES:
            return {
                ...state,
                data: [...state.data, payload]
            }
        case GLOBALTYPES.CREATE_CONVERSATION:
            return {
                ...state,
                conversations: [ {
                    ...payload, recipients: payload.recipients.filter(item => item._id !== payload.user._id)
                },...state.conversations]
            }
        case GLOBALTYPES.UPDATE_CONVERSATION:
            let newUpdateConversations = state.conversations.map(conv => (
                conv._id === payload._id ? 
                {
                    ...conv,
                    recipients: payload.recipients.filter(item => item._id !== payload.user._id),
                    convName: payload.convName,
                    convAvatar: payload.convAvatar,
                    updatedAt: payload.updatedAt
                } : conv
            ))
            return {
                ...state,
                conversations: newUpdateConversations
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