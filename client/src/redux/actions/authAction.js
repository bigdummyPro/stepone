import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { GLOBALTYPES } from "../constants/globalTypes";


export const loadUser = () => async (dispatch) => {
    if(localStorage[GLOBALTYPES.LOCAL_STORAGE_ACCESS_TOKEN_NAME]){
        setAuthToken(localStorage[GLOBALTYPES.LOCAL_STORAGE_ACCESS_TOKEN_NAME]);
    }
    try {
        const response = await axios.get(`${GLOBALTYPES.ApiUrl}/user`);
        if (response.data.success) {
            localStorage.setItem(GLOBALTYPES.LOCAL_STORAGE_REFRESH_TOKEN_NAME, response.data.user.refreshToken);
            dispatch({
                type: GLOBALTYPES.SET_AUTH,
                payload: {
                    isAuthenticated: true, 
                    user: response.data.user,
                    isWaiting: true
                }
            })
        }
    } catch (error) {
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
    try {
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
        return response;
    } catch (error) {
        if(error.response.data) return error.response.data
        else return {success: false, message: error.message}
    }
} 
//Logout
export const logoutUser = () => async (dispatch) => {
    try {
        localStorage.removeItem(GLOBALTYPES.LOCAL_STORAGE_ACCESS_TOKEN_NAME);
        localStorage.removeItem(GLOBALTYPES.LOCAL_STORAGE_REFRESH_TOKEN_NAME);
        dispatch({
            type: GLOBALTYPES.SET_AUTH,
            payload: {isAuthenticated: false, user: null, isWaiting: true}
        })
        //khi await call api logout không trả về kết quả thì nếu đặt code phía dưới nó sẽ không thực thi được
        await axios.put(`${GLOBALTYPES.ApiUrl}/auth/logout`);
    } catch (error) {
        if(error.response.data) return error.response.data
        else return {success: false, message: error.message}
    }
}
//refresh token
export const refreshToken = () => async dispatch => {
    const res = await axios.put(`${GLOBALTYPES.ApiUrl}/auth/refreshToken`, {refreshToken : localStorage[GLOBALTYPES.LOCAL_STORAGE_REFRESH_TOKEN_NAME]});
    if(res.data.success){

        // localStorage.setItem(GLOBALTYPES.LOCAL_STORAGE_REFRESH_TOKEN_NAME, res.data.tokens.refreshToken);

        localStorage.setItem(GLOBALTYPES.LOCAL_STORAGE_ACCESS_TOKEN_NAME, res.data.tokens.accessToken);

        await dispatch(loadUser()); 
        setTimeout(()=>{console.log('ooo')
            dispatch(refreshToken());
        }, 50 * 60 * 1000)
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


