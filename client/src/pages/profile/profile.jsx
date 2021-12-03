import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import { getUserProfile } from '../../redux/actions/profileAction';
import ProfileBody from './profile-body';
import ProfileEditModal from './profile-edit-modal';
import ProfileInfo from './profile-info';
import ProfileMenu from './profile-menu';
import './profile.scss';

function Profile() {
    const profileState = useSelector(state => state.profileReducer);
    const authState = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(()=>{
        if(profileState.ids.every(item => item !== id)){
            dispatch(getUserProfile({id}));
        }
    },[dispatch, id, profileState.ids])
    return (
        <div className="main-content">
            <div className="main-container">
                <div className="main-body">
                    <div className="profile">
                        <div className="profile__header">
                            <ProfileInfo 
                                id={id}
                                profile={profileState}
                                auth={authState}
                                dispatch={dispatch}
                            />
                            <ProfileMenu />
                        </div> 
                        <ProfileBody 
                            id={id}
                            profile={profileState}
                            auth={authState}
                        />
                        <ProfileEditModal />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;