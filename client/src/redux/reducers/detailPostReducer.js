import { EditData, GLOBALTYPES } from "../constants/globalTypes";

const detailPostReducer = (state = [], action) => {
    switch (action.type){
        case GLOBALTYPES.GET_POST:
            return [...state, action.payload]
        case GLOBALTYPES.UPDATE_POST:
            return EditData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}


export default detailPostReducer