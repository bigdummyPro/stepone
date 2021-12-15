import React, { useEffect, useState } from 'react';
import MessageBox from './message-box';
import { useDispatch, useSelector } from 'react-redux';
import MessageLeftSearch from './message-left-search';
import { getConversations } from '../../redux/actions/messageAction';

function MessageLeft(props) {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.authReducer);
    const messageState = useSelector(state => state.messageReducer);

    useEffect(()=>{
        dispatch(getConversations({auth: authState, page: 1}))
    },[])
    console.log(messageState)

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
            <MessageLeftSearch 
                auth={authState}
            />
            <div className="message-left-list">
                {
                    messageState.conversations.map((conv, index) => (
                        <MessageBox 
                            key={index}
                            conversation={conv}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default MessageLeft;