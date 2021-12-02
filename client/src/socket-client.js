import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from './redux/constants/globalTypes';

function SocketClient() {
    const dispatch = useDispatch();

    const authState = useSelector(state => state.authReducer);
    const socketState = useSelector(state => state.socketReducer);
    
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


    return null;
}

export default SocketClient;