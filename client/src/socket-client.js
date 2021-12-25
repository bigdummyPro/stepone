import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from './redux/constants/globalTypes';
import NotiAudio from './assets/audio/noti-audio02.mp3';

const showNotiToDesktop = (body, icon, url, title) => {
    // console.log(Notification.permission);

    if(Notification.permission === 'granted'){
        handleShowNoti();
    }else if(Notification.permission !== 'denied'){
        Notification.requestPermission().then(permission => {
            if(permission === 'granted'){
                handleShowNoti();
            }
        })
    }
    function handleShowNoti(){
        let options = {
            body, icon
        }
        let n = new Notification(title, options)

        n.onclick = e => {
            e.preventDefault()
            window.open(url, '_blank')
        }
    }
}

function SocketClient() {
    const dispatch = useDispatch();
    const notiAudioRef = useRef(null);

    const authState = useSelector(state => state.authReducer);
    const socketState = useSelector(state => state.socketReducer);
    const notificationState = useSelector(state => state.notificationReducer);
    const onlineState = useSelector(state => state.onlineReducer);
    const messageState = useSelector(state => state.messageReducer);
    
    // joinUser
    useEffect(() => {
        socketState.emit('joinUser', authState.user)
    },[socketState, authState.user])

    // Follow
    useEffect(() => {
        socketState.on('followToClient', newUser =>{
            dispatch({type: GLOBALTYPES.SET_AUTH, payload: {...authState, user: newUser}})
        })

        return () => socketState.off('followToClient')
    },[socketState, dispatch, authState])

    //Unfollow
    useEffect(() => {
        socketState.on('unFollowToClient', newUser =>{
            dispatch({type: GLOBALTYPES.SET_AUTH, payload: {...authState, user: newUser}})
        })

        return () => socketState.off('unFollowToClient')
    },[socketState, dispatch, authState])

    // Notification
    useEffect(() => {
        socketState.on('createNotificationToClient', message =>{
            dispatch({type: GLOBALTYPES.CREATE_NOTIFICATION, payload: message})
            
            if(!notificationState.sound) {
                notiAudioRef.current.play();
            }
            showNotiToDesktop(
                message.user.username + ' ' + message.text,
                message.user.avatar,
                message.url,
                'V-NETWORK'
            )
        })

        return () => socketState.off('createNotificationToClient')
    },[socketState, dispatch, notificationState.sound])

    useEffect(() => {
        socketState.on('removeNotificationToClient', message =>{
            dispatch({type: GLOBALTYPES.REMOVE_NOTIFICATION, payload: message})
        })

        return () => socketState.off('removeNotificationToClient')
    },[socketState, dispatch])

     // Likes
     useEffect(() => {
        socketState.on('likeToClient', newPost =>{
            dispatch({type: GLOBALTYPES.UPDATE_POST, payload: newPost})
        })

        return () => socketState.off('likeToClient')
    },[socketState, dispatch])

    useEffect(() => {
        socketState.on('unLikeToClient', newPost =>{
            dispatch({type: GLOBALTYPES.UPDATE_POST, payload: newPost})
        })

        return () => socketState.off('unLikeToClient')
    },[socketState, dispatch])

    //Comment
    useEffect(() => {
        socketState.on('createCommentToClient', newPost => {
            dispatch({type: GLOBALTYPES.UPDATE_POST, payload: newPost})
        })

        return () => socketState.off('createCommentToClient');
    },[socketState, dispatch])

    useEffect(() => {
        socketState.on('deleteCommentToClient', newPost =>{
            dispatch({type: GLOBALTYPES.UPDATE_POST, payload: newPost})
        })

        return () => socketState.off('deleteCommentToClient')
    },[socketState, dispatch])

    // Message
    useEffect(() => {
        socketState.on('addMessageToClient', message =>{
            dispatch({type: GLOBALTYPES.CREATE_MESSAGE, payload: {...message, user: authState.user}})
        })
        // if(!notificationState.sound) {
        //     notiAudioRef.current.play();
        // }

        return () => socketState.off('addMessageToClient')
    },[socketState, dispatch, notificationState.sound])

    useEffect(() => {
        socketState.on('addConvGroupToClient', conversation => {
            dispatch({type: GLOBALTYPES.CREATE_CONVERSATION, payload: {...conversation, user: authState.user}})
        })
    }, [socketState, dispatch])

    useEffect(() => {
        socketState.on('updateConvGroupToClient', conversation => {
            dispatch({type: GLOBALTYPES.UPDATE_CONVERSATION, payload: {...conversation, user: authState.user}})
        })
    }, [socketState, dispatch])

    useEffect(() => {
        socketState.on('updateIsReadConvToClient', ({conversation, user}) => {

            if(conversation.convType === 'group'){
                dispatch({type: GLOBALTYPES.UPDATE_ISREAD_CONVERSATION, payload: {_id: conversation._id, user}})
            }else if(conversation.convType === 'personal'){
                dispatch({
                    type: GLOBALTYPES.UPDATE_ISREAD_CONVERSATION, 
                    payload: {
                        _id: user._id, 
                        user
                    }
                })
            }
        })
    }, [socketState, dispatch])

    useEffect(() => {
        socketState.on('preventUserToClient', noActiveData => {
            dispatch({type: GLOBALTYPES.SET_NO_ACTIVE_USER, payload: {_id: noActiveData._convID}})
        })
    }, [socketState, dispatch])

    // Check User Online / Offline
    useEffect(() => {
        socketState.emit('checkUserOnline', authState.user)
    },[socketState, authState.user])

    useEffect(() => {
        socketState.on('checkUserOnlineToMe', data =>{
            data.forEach(item => {
                if(!onlineState.includes(item.id)){
                    dispatch({type: GLOBALTYPES.SET_ONLINE, payload: item.id})
                }
            })
        })

        return () => socketState.off('checkUserOnlineToMe')
    },[socketState, dispatch, onlineState])

    useEffect(() => {
        socketState.on('checkUserOnlineToClient', id =>{
            if(!onlineState.includes(id)){
                dispatch({type: GLOBALTYPES.SET_ONLINE, payload: id})
            }
        })

        return () => socketState.off('checkUserOnlineToClient')
    },[socketState, dispatch, onlineState])

    // Check User Offline
    useEffect(() => {
        socketState.on('CheckUserOffline', id =>{
            dispatch({type: GLOBALTYPES.SET_OFFLINE, payload: id})
        })

        return () => socketState.off('CheckUserOffline')
    },[socketState, dispatch])

    return (
        <>
            <audio 
                controls 
                ref={notiAudioRef} 
                style={{display: 'none'}}
            >
                <source src={NotiAudio} type="audio/mp3"/>
            </audio>
        </>
    )
}

export default SocketClient;