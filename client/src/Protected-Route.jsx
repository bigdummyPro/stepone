import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AllRoute from './All-Route';
import CreatePostModal from './components/create-post-modal/create-post-modal';
import CreateStoriesModal from './components/create-stories-modal/create-stories-modal';
import EmotionModal from './components/emotion-modal/emotion-modal';
import MenuPost from './components/menu-post/menu-post';
import SidebarLeft from './components/sidebar-left/sidebar-left';
import SidebarRight from './components/sidebar-right/sidebar-right';
import { refreshToken } from './redux/actions/authAction';
import SocketClient from './socket-client';

function ProtectedRoute() {
    const modalState = useSelector(state => state.modalReducer.createPostModalStatus);
    const authState = useSelector(state => state.authReducer);

    const dispatch = useDispatch()
    //Refresh Token
    useEffect(()=>{
      dispatch(refreshToken());
    },[dispatch])

    if(authState.isAuthenticated)
      return (
          <div className="wrapper">
            {authState.user && <SocketClient />}
            <SidebarLeft />
            <MenuPost />
            <AllRoute />
            <SidebarRight />
            {modalState ? <CreatePostModal /> : null}
            <EmotionModal />
            <CreateStoriesModal />
          </div>
      );
    else return <Navigate to='/login-register'/>
}

export default ProtectedRoute;