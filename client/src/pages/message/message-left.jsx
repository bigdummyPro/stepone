import React from 'react';
import MessageBox from './message-box';

function MessageLeft(props) {
    return (
        <div className="message-left">
            <div className="message-left__header">
                <span className="message-title">
                    Chat
                </span>
                <ul className="message-tool">
                    <li className="message-tool__item">
                        <span>
                            <i className="fas fa-ellipsis-h"></i>
                        </span>
                    </li>
                    <li className="message-tool__item">
                        <span>
                            <i className="fas fa-video"></i>
                        </span>
                    </li>
                </ul>
            </div>
            <div className="message-left-search">
                <div className="search-wrapper">
                    <input type="text" name="" id="" placeholder="Search In Message"/>
                    <span><i className="fas fa-search"></i></span>
                </div>
            </div>
            <div className="message-left-list">
                <MessageBox />
                <MessageBox />
                <MessageBox />
            </div>
        </div>
    );
}

export default MessageLeft;