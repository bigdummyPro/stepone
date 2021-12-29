import { GLOBALTYPES } from "../constants/globalTypes";

const initialState = {

}

const storiesReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GLOBALTYPES.CREATE_STORIES:
            
            return state;
    
        default:
            return state;
    }
}

export default storiesReducer;