import React from 'react';

function ProfileMenu(props) {
    return (
        <div className="profile-menu">
            <ul className="profile-menu__list">
                <li className="profile-menu-item --active">
                    <a href="#vv">Posts</a>
                </li>
                <li className="profile-menu-item">
                    <a href="#vv">About</a>
                </li>
                <li className="profile-menu-item">
                    <a href="#vv">Friends</a>
                </li>
                <li className="profile-menu-item">
                    <a href="#vv">Images</a>
                </li>
                <li className="profile-menu-item">
                    <a href="#vv">Video</a>
                </li>
                <li className="menu-line"></li>
            </ul>
        </div>
    );
}

export default ProfileMenu;