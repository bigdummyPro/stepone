import axios from "axios";
import { GLOBALTYPES } from "../constants/globalTypes";


export const getSuggestedUsers = () => async dispatch => {
    try {
        dispatch({type: GLOBALTYPES.LOADING_SUGGESTION, payload: true});

        const response = await axios.get(`${GLOBALTYPES.ApiUrl}/user/suggested-user`);
        if(response.data.success){
            dispatch({type: GLOBALTYPES.GET_USERS_SUGGESTION, payload: response.data})
            dispatch({type: GLOBALTYPES.LOADING_SUGGESTION, payload: false});
        }
    } catch (error) {
        console.log(error.message);
    }
}