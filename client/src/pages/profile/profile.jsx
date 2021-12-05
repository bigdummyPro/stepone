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
    const [editModalStatus, setEditModalStatus] = useState(false);
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch();

    const {id} = useParams();

    const handleEditModal = (status) => {
        const menuPostEl = document.querySelector('.menu-post-wrapper');
        menuPostEl.style.zIndex = '20';
        setEditModalStatus(status);
    }

    useEffect(()=>{
        if(profileState.ids.every(item => item !== id)){
            dispatch(getUserProfile({id}));
        }
    },[dispatch, id, profileState.ids])

    useEffect(()=>{
        if(authState.user._id === id){
            setUserData([authState.user])
        }else{
            const newData = profileState.users.filter(user => user._id === id);
            setUserData(newData);
        }
    },[id, authState.user, profileState.users])
    return (
        <div className="main-content">
            <div className="main-container">
                <div className="main-body">
                    {
                        userData.map((usDa, index)=>(
                            <div className="profile" key={index}>
                                <div className="profile__header">
                                    <ProfileInfo 
                                        id={id}
                                        profile={profileState}
                                        auth={authState}
                                        dispatch={dispatch}
                                        handleEditModal={(status)=>handleEditModal(status)}
                                    />
                                    <ProfileMenu />
                                </div> 
                                <ProfileBody 
                                    id={id}
                                    profile={profileState}
                                    auth={authState}
                                    handleEditModal={(status)=>handleEditModal(status)}
                                />
                                {
                                    editModalStatus ?
                                    <ProfileEditModal 
                                        handleEditModal={(status)=>handleEditModal(status)}
                                        profile={usDa}
                                        auth={authState}
                                        dispatch={dispatch}
                                    /> : null
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;