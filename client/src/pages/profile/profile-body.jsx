import React, { useState } from 'react';
import { Routes, Route } from 'react-router';
import ProfileBodyAbout from './profile-body-about';
import ProfileBodyFollow from './profile-body-follow';
import ProfileBodyPost from './profile-body-post';

function ProfileBody(props) {
    
    return (
        <div className="profile__body">
            <Routes>
                <Route path="/post" element={<ProfileBodyPost />}/>
                <Route path="/about" element={<ProfileBodyAbout />}/>
                <Route path="/follow" element={<ProfileBodyFollow />}/>
                <Route path="/image" element={<div>Đang cập nhật</div>}/>
                <Route path="/video" element={<div>Đang cập nhật</div>}/>
            </Routes>
        </div>
    );
}

export default ProfileBody;