import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GeneralSetting from './pages/general-setting/general-setting';
import Home from './pages/home/home';
import Message from './pages/message/message';
import Profile from './pages/profile/profile';
import SavedPost from './pages/saved-post/saved-post';

function AllRoute(){
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/message" element={<Message />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/saved-post" element={<SavedPost />}/>
            <Route path="/general-setting" element={<GeneralSetting />}/>
        </Routes>
    );
}

export default AllRoute;