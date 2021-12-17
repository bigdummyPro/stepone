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

            const convID = payload.recipients.filter(item => item._id !== payload.user._id)[0]._id;

            if(state.conversations.every(item => item._id !== convID)){
                newConversations = [...state.conversations, {
                    _id: payload._convID, 
                    text: payload.text, 
                    currentSender: payload.sender,
                    media: payload.media, 
                    recipients: payload.recipients.filter(item => item._id !== payload.user._id), 
                    convType: 'personal'
                }];
                //sort by updateAt
                newConversations = sortConvWhenAddMess(newConversations)
                    // const fromIndex = newConversations.length - 1;
                    // const elementClone = newConversations[fromIndex];

                    // newConversations.splice(fromIndex, 1);
                    // newConversations.splice(0, 0, elementClone);
                //end sort

                newData = [...state.data, {result: 1, messages: [payload], _id: convID}];
                console.log(newConversations)
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
                newConversations = sortConvWhenAddMess(newConversations);
                    // const fromIndex = newConversations.findIndex(conv => conv._id === payload._convID);
                    // const elementClone = newConversations[fromIndex];

                    // newConversations.splice(fromIndex, 1);
                    // newConversations.splice(0, 0, elementClone);
                //end sort

                newData = state.data.map(data => (
                    data._id === convID ?
                    {
                        ...data,
                        messages: [...data.messages, payload],
                        result: data.result + 1
                    } : data
                ))
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
            return
        default:
            return state;
    }
}

const sortConvWhenAddMess = (conversations) => {
    const newConversations = [...conversations];

    const fromIndex = newConversations.length - 1;
    const elementClone = newConversations[fromIndex];

    newConversations.splice(fromIndex, 1);
    newConversations.splice(0, 0, elementClone);

    return newConversations
}

export default messageReducer;