import React from 'react';
import './message.scss';
import MenuPost from '../../components/menu-post/menu-post';
import SidebarLeft from '../../components/sidebar-left/sidebar-left';
import SidebarRight from '../../components/sidebar-right/sidebar-right';
import MessageLeft from './message-left';
import MessageRight from './message-right';

function Message() {
    return (
        <div className="wrapper">
            <SidebarLeft />
            <div className="main-content">
                <div className="main-container">
                    <MenuPost />
                    <div className="main-body">
                        <div className="message">
                            <MessageLeft />
                            <MessageRight />
                        </div> 
                    </div>
                </div>
            </div>
            <SidebarRight />
        </div>
    );
}

export default Message;