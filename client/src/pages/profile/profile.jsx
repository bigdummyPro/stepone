import React from 'react';
import DetailPostModal from '../../components/detail-post-modal/detail-post-modal';
import MenuPost from '../../components/menu-post/menu-post';
import SidebarLeft from '../../components/sidebar-left/sidebar-left';
import SidebarRight from '../../components/sidebar-right/sidebar-right';
import ProfileBody from './profile-body';
import ProfileInfo from './profile-info';
import ProfileMenu from './profile-menu';
import './profile.scss';

function Profile() {
    return (
        <div className="wrapper">
            <SidebarLeft />
            <MenuPost />
            <div className="main-content">
                <div className="main-container">
                    <div className="main-body">
                        <div className="profile">
                            <div className="profile__header">
                                <ProfileInfo />
                                <ProfileMenu />
                            </div> 
                            <ProfileBody />
                        </div>
                    </div>
                </div>
            </div>
            <SidebarRight />
            {/* <DetailPostModal /> */}
        </div>
    );
}

export default Profile;