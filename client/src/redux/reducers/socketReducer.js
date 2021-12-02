const { GLOBALTYPES } = require("../constants/globalTypes");


const socketReducer = (state = [], action) => {
    switch (action.type) {
        case GLOBALTYPES.SET_SOCKET:
            return action.payload;
    
        default:
            return state;
    }
}

export default socketReducer;