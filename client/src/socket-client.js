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