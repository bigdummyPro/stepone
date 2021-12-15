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
        case GLOBALTYPES.CREATE_MESSAGE:

            let newConversations = [];
            let newData = [];

            if(!state.conversations.includes(payload._id)){
                newConversations = [...state.conversations, {_id: payload._id, text: payload.text, media: payload.media, recipients: [payload.recipients], convType: 'personal'}];

                newData = [...state.data, {result: 1, messages: [payload], _id: payload._id}];
            }else{
                newConversations = state.conversations.map(conv => (
                    conv._id === payload._id ? 
                    {
                        ...conv,
                        text: payload.text,
                        media: payload.media
                    } : conv
                ))

                newData = state.data.map(data => (
                    data._id === payload._id ?
                    {
                        ...data,
                        message: [...data.message, payload],
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

export default messageReducer;