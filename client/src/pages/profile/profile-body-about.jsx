import React from 'react';

function ProfileBodyAbout({userData, auth, handleEditModal}) {
    return (
        <div className="profile-body-about">
            <ul className="profile-body-about__list">
                <li className="profile-about-item">
                    <span>
                        <i className="fas fa-user-tie"></i>
                        Username
                    </span>
                    <span>{userData.username}</span>
                </li>
                <li className="profile-about-item">
                    <span>
                        <i className="fas fa-user-secret"></i>
                        Nickname
                    </span>
                    <span>{userData.nickname || '***'}</span>
                </li>
                <li className="profile-about-item">
                    <span>
                        <i className="fas fa-venus-mars"></i>
                        Gender
                    </span>
                    <span>{(userData.gender !== 'unset' && userData.gender) || '***'}</span>
                </li>
                <li className="profile-about-item">
                    <span>
                        <i className="fas fa-map-marker-alt"></i>
                        Address
                    </span>
                    <span>{userData.address || '***'}</span>
                </li>
                <li className="profile-about-item">
                    <span>
                        <i className="fas fa-mobile-alt"></i>
                        Phone Number
                    </span>
                    <span>{`${userData.mobile && '+84'} ${userData.mobile || '***'}`}</span>
                </li>
            </ul>
            {
                userData._id === auth.user._id ?
                    <span 
                        className="profile-body-about__tool"
                        onClick={()=>handleEditModal(true)}
                    >
                        <i className="fas fa-pencil-alt"></i>
                    </span> : null
            }
        </div>
    );
}

export default ProfileBodyAbout;