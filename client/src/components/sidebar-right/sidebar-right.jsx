import React from 'react';
import './sidebar-right.scss';
import TopMenu from './top-menu';
import ActiveUser from './active-user';
import SavedPost from './saved-post';

function SidebarRight(props) {
    return (
        <div className="sidebar-right-container">
            <div className="sidebar-right">
                <TopMenu />
                <ActiveUser />
                <SavedPost />
            </div>
        </div>
    );
}

export default SidebarRight;