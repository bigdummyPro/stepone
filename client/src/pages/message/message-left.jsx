import React, { useEffect, useState } from 'react';
import MessageBox from './message-box';
import { useDispatch, useSelector } from 'react-redux';
import MessageLeftSearch from './message-left-search';
import { getConversations } from '../../redux/actions/messageAction';
import { useNavigate, useParams } from 'react-router';

function MessageLeft(props) {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.authReducer);
    const messageState = useSelector(state => state.messageReducer);

    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!id && messageState.conversations.length > 0) navigate(`/message/${messageState.conversations[0]._id}`)
    },[id, messageState.conversations, navigate])

    useEffect(()=>{
        dispatch(getConversations({auth: authState, page: 1}))
    },[authState, dispatch])
    
    return (
        <div className="message-left">
            <div className="message-left__header">
                <span className="message-title">
                    Chat
                </span>
                <ul className="message-tool-left">
                    <li className="tool-left__item">
                        <span className="tool-left-icon">
                            <i className="fas fa-ellipsis-h"></i>
                        </span>
                        <ul className="tool-left-menu">
                            <li className="menu-item">
                                <i className="fas fa-user-friends"></i>
                                <span>Group chat</span>
                            </li>
                            <li className="menu-item">
                                <i className="fas fa-bell"></i>
                                <span>Turn on notification</span>
                            </li>
                        </ul>
                    </li>
                    <li className="tool-left__item">
                        <span className="tool-left-icon">
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
                            id={id}
                            auth={authState}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default MessageLeft;