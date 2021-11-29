import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AllRoute from './All-Route';
import CreatePostModal from './components/create-post-modal/create-post-modal';
import EmotionModal from './components/emotion-modal/emotion-modal';
import MenuPost from './components/menu-post/menu-post';
import SidebarLeft from './components/sidebar-left/sidebar-left';
import SidebarRight from './components/sidebar-right/sidebar-right';
import { loadUser } from './redux/actions/authAction';
import { GLOBALTYPES } from './redux/constants/globalTypes';

function ProtectedRoute({vv}) {
    const modalState = useSelector(state => state.modalReducer.createPostModalStatus);
    const authState = useSelector(state => state.authReducer);
    console.log(authState)
    if(authState.isAuthenticated)
      return (
          <div className="wrapper">
            <SidebarLeft />
            <MenuPost />
            <AllRoute />
            <SidebarRight />
            {modalState ? <CreatePostModal /> : null}
            <EmotionModal />
          </div>
      );
    else return <Navigate to='/login-register'/>
}

export default ProtectedRoute;