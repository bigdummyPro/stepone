import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageRender from './customRouter/PageRender';
import GeneralSetting from './pages/general-setting/general-setting';
import Home from './pages/home/home';
import Message from './pages/message/message';
import Profile from './pages/profile/profile';
import Stories from './pages/stories-page/stories';

function AllRoute(){
    return (
        <Routes>
            <Route path="/" element={<Home />}/>

            {/* <Route path="/:page" element={<PageRender />}/>
            <Route path="/:page/:id" element={<PageRender />}/> */}

            <Route path="/message" element={<Message />}/>
            <Route path="/message/:id" element={<Message />}/>

            <Route path="/profile/:id/*" element={<Profile />}/>
            <Route path="/stories" element={<Stories />}/>
            <Route path="/general-setting" element={<GeneralSetting />}/>
            <Route path="/*" element={null}/>
        </Routes>
    );
}

export default AllRoute;