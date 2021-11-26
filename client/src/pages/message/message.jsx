import React from 'react';
import './message.scss';
import MenuPost from '../../components/menu-post/menu-post';
import MessageLeft from './message-left';
import MessageRight from './message-right';

function Message() {
    return (
        <div className="main-content">
            <div className="main-container">
                <div className="main-body">
                    <div className="message">
                        <MessageLeft />
                        <MessageRight />
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Message;