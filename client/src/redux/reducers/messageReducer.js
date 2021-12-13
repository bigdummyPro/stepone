const { GLOBALTYPES } = require("../constants/globalTypes");

const initialState = {

}

const messageReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GLOBALTYPES.CREATE_MESSAGE:
            
            return;
    
        default:
            return state;
    }
}

export default messageReducer;