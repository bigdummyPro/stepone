import React, {useEffect} from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import GroupAvatarImg from '../../assets/images/group-avatar.png';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { isReadUpdate } from '../../redux/actions/messageAction';

function MessageBox({conversation, id, auth, dispatch, socket}) {

    const handleIsRead = () => {
        if(conversation.isRead.every(item => item._id !== auth.user._id))
        dispatch(isReadUpdate({conversation, auth, socket}))
    }
    useEffect(()=>{
        if(conversation._id === id) handleIsRead();
    },[id, conversation])

    return (
        <Link 
            to={`/message/${conversation._id}`}
            className={`message-box ${id === conversation._id ? '--active' : ''} ${conversation.isRead.every(item => item._id !== auth.user._id) ? '--unread' : ''}`}
            onClick={handleIsRead}
        >
            <div className="message-box__left">
                <img src={conversation.convType === 'personal' ? (conversation.recipients[0].avatar || UserAvatarImg): (conversation.convAvatar || GroupAvatarImg)} alt="" />
                {
                    conversation.online ?
                    <span className="active-dot"></span> : null
                }
            </div>
            <div className="message-box__center">
                <span className="message-box-name">
                    {conversation.convType === 'personal' ? conversation.recipients[0].username : conversation.convName}
                </span>
                {
                    <div className="message-box-description">
                        <span className="message-content">
                            {
                                conversation.currentSender && conversation.currentSender._id === auth.user._id ? 'You: ' : null
                            }
                            {conversation.text ? conversation.text : ''}
                        </span>
                        <span className="message-time">
                            {moment(conversation.updatedAt).fromNow()}
                        </span>
                    </div>
                }
            </div>
            <div className="message-box__right">
                <div className="message-tool">
                    <span className="message-tool__icon">
                        <i className="fas fa-ellipsis-h"></i>
                    </span>
                </div>
            </div>
            <span className="message-box-status-dot"></span>
        </Link>
    );
}

export default MessageBox;