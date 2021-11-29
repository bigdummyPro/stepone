import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { GLOBALTYPES } from "../constants/globalTypes";


export const loadUser = () => async (dispatch) => {
    if(localStorage[GLOBALTYPES.LOCAL_STORAGE_ACCESS_TOKEN_NAME]){
        setAuthToken(localStorage[GLOBALTYPES.LOCAL_STORAGE_ACCESS_TOKEN_NAME]);
    }
    try {
        const response = await axios.get(`${GLOBALTYPES.ApiUrl}/user`);
        console.log(response)
        if (response.data.success) {
            localStorage.setItem(GLOBALTYPES.LOCAL_STORAGE_REFRESH_TOKEN_NAME, response.data.user.refreshToken);
            console.log('mm')
            dispatch({
                type: GLOBALTYPES.SET_AUTH,
                payload: {
                    isAuthenticated: true, 
                    user: response.data.user,
                    isWaiting: true
                }
            })
        }
    } catch (error) {console.log('êrr')
        localStorage.removeItem(GLOBALTYPES.LOCAL_STORAGE_ACCESS_TOKEN_NAME);
        setAuthToken(null);
        dispatch({
            type: GLOBALTYPES.SET_AUTH,
            payload: {
                isAuthenticated: false,
                user: null,
                isWaiting: true
            }
        })
    }
}
//Register
export const registerUser = async userForm => {
    try {console.log(userForm)
        const response = await axios.post(`${GLOBALTYPES.ApiUrl}/auth/register`, userForm)
        return response
    } catch (error) {
        if(error.response.data) return error.response.data
        else return {success: false, message: error.message}
    }
}
//Login
export const loginUser = userForm => async dispatch => {
    try {
        const response = await axios.post(`${GLOBALTYPES.ApiUrl}/auth/login`, userForm);
        if (response.data.success){
            localStorage.setItem(GLOBALTYPES.LOCAL_STORAGE_ACCESS_TOKEN_NAME, response.data.accessToken);
        }
        await dispatch(loadUser());
        // dispatch({
        //     type: GLOBALTYPES.SET_AUTH,
        //     payload: {
        //         isAuthenticated: true,
        //         user: null,
        //         isWaiting: true
        //     }
        // })
        return response;
    } catch (error) {
        if(error.response.data) return error.response.data
        else return {success: false, message: error.message}
    }
}
// export const loginUserWith = async userForm => {
//     try {
//         const response = await axios.post(`${GLOBALTYPES.ApiUrl}/admin/login-with`, userForm);
//         if (response.data.success){
//             localStorage.setItem(GLOBALTYPES.LOCAL_STORAGE_ACCESS_TOKEN_NAME, response.data.accessToken);
//         }
//         await loadUser();
//     } catch (error) {
//         if(error.response.data) return error.response.data
//         else return {success: false, message: error.message}
//     }
// }


//Logout
// export const logoutUser = (dispatch) => {
//     localStorage.removeItem(GLOBALTYPES.LOCAL_STORAGE_ACCESS_TOKEN_NAME);
//     localStorage.removeItem(GLOBALTYPES.LOCAL_STORAGE_REFRESH_TOKEN_NAME);
//     dispatch({
//         type: GLOBALTYPES.SET_AUTH,
//         payload: {isAuthenticated: false, user: null}
//     })
// }