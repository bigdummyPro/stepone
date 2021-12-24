import { DeleteData, GLOBALTYPES } from "../constants/globalTypes";
import { getDataAPI, patchDataAPI } from "../../utils/fetch-data-api";
import { imageUpload } from "../../utils/image-upload";
import { createNotification, removeNotification } from "./notificationAction";

export const getUserProfile = ({id, auth}) => async (dispatch) => {
    dispatch({type: GLOBALTYPES.SET_IDS, payload: id})

    try {
        dispatch({type: GLOBALTYPES.LOADING_PROFILE, payload: true})
        const res = await getDataAPI(`user/get-user-by-id/${id}`)
        const res1 = await getDataAPI(`post/user-posts/${id}`)

        dispatch({
            type: GLOBALTYPES.SET_USERS_INFO,
            payload: res.data
        })

        dispatch({
            type: GLOBALTYPES.GET_PROFILE_POSTS,
            payload: {...res1.data, _id: id, page: 2}
        })

        dispatch({type: GLOBALTYPES.LOADING_PROFILE, payload: false})
    } catch (err) {
        console.log(err.message)
        // dispatch({
        //     type: GLOBALTYPES.ALERT, 
        //     payload: {error: err.response.data.msg}
        // })
    }
    
}

export const updateUserProfile = ({userData, userAvatar, auth}) => async dispatch => {
    try {
        let media;
        if(userAvatar) media = await imageUpload([userAvatar]);

        const res = await patchDataAPI('user', {
            ...userData,
            avatar: userAvatar ? media[0].url : auth.user.avatar
        });

        dispatch({
            type: GLOBALTYPES.SET_AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData,
                    avatar: userAvatar ? media[0].url : auth.user.avatar,
                }
            }
        })

        return res
    } catch (error) {
        console.log(error.message)
    }
}

export const follow = ({users, user, auth, socket}) => async dispatch => {
    let newUser;

    if(users.every(item => item._id !== user._id)){
        newUser = {...user, followers: [...user.followers, auth.user]};
    }else{
        console.log(user._id)
        users.forEach(item => {console.log(item)
            if(item._id === user._id) {console.log('tty')
                newUser = {...item, followers: [...item.followers, auth.user]};
            }
        });
    }

    dispatch({type: GLOBALTYPES.FOLLOW, payload: newUser})

    dispatch({type: GLOBALTYPES.SET_AUTH, payload: {
        ...auth,
        user: {...auth.user, following: [...auth.user.following, newUser]}
    }})

    try {
        const res = await patchDataAPI(`user/${user._id}/follow`, null)
        socket.emit('follow', res.data.newUser)

        // Notify
        const message = {
            id: auth.user._id,
            text: 'has started to follow you.',
            recipients: [newUser._id],
            url: `/profile/${auth.user._id}/about`,
        }

        dispatch(createNotification({message, auth, socket}))

    } catch (err) {
        console.log(err.message)
        // dispatch({
        //     type: GLOBALTYPES.ALERT, 
        //     payload: {error: err.response.data.msg}
        // })
    }
}

export const unfollow = ({users, user, auth, socket}) => async (dispatch) => {

    let newUser;

    if(users.every(item => item._id !== user._id)){
        newUser = {...user, followers: DeleteData(user.followers, auth.user._id)}
    }else{
        users.forEach(item => {
            if(item._id === user._id){
                newUser = {...item, followers: DeleteData(item.followers, auth.user._id)}
            }
        })
    }

    dispatch({ type:GLOBALTYPES.UNFOLLOW, payload: newUser })

    dispatch({
        type: GLOBALTYPES.SET_AUTH, 
        payload: {
            ...auth,
            user: { 
                ...auth.user, 
                following: DeleteData(auth.user.following, newUser._id) 
            }
        }
    })
   

    try {
        const res = await patchDataAPI(`user/${user._id}/unfollow`, null);
        
        socket.emit('unFollow', res.data.newUser)

        // Notify
        const message = {
            id: auth.user._id,
            text: 'has started to follow you.',
            recipients: [newUser._id],
            url: `/profile/${auth.user._id}/about`,
        }

        dispatch(removeNotification({message, auth, socket}))

    } catch (err) {
        console.log(err.message)
        // dispatch({
        //     type: GLOBALTYPES.ALERT, 
        //     payload: {error: err.response.data.msg}
        // })
    }
}