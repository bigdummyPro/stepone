import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import ProfileBodyAbout from './profile-body-about';
import ProfileBodyFollow from './profile-body-follow';
import ProfileBodyPost from './profile-body-post';

function ProfileBody({id, profile, detailPost, auth, socket, dispatch, handleEditModal}) {
    const [userData, setUserData] = useState([]);

    useEffect(()=>{
        if(auth.user._id === id){
            setUserData([auth.user])
        }else{
            const newData = profile.users.filter(user => user._id === id);
            setUserData(newData);
        }
    },[id, auth.user, profile.users])

    return (
        <div className="profile__body">
            {
                userData.map((item, index) => (
                    <Routes key={index}>
                        <Route 
                            path="/post" 
                            element={<ProfileBodyPost 
                                profile={profile}
                                detailPost={detailPost}
                                auth={auth}
                                socket={socket}
                                dispatch={dispatch}
                            />}
                        />
                        <Route 
                            path="/about" 
                            element={<ProfileBodyAbout 
                                userData={item} 
                                auth={auth}
                                handleEditModal={(status)=>handleEditModal(status)}
                            />}
                        />
                        <Route 
                            path="/follow" 
                            element={<ProfileBodyFollow followers={item.followers} following={item.following}/>}
                        />
                        <Route path="/image" element={<div>Đang cập nhật</div>}/>
                        <Route path="/video" element={<div>Đang cập nhật</div>}/>
                    </Routes>
                ))
            }
        </div>
    );
}

export default ProfileBody;