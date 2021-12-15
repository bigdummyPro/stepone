import React from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import GroupAvatarImg from '../../assets/images/group-avatar.png';
import moment from 'moment';

function MessageItem({conversation}) {
    return (
        <div className="message-box">
            <div className="message-box__left">
                <img src={conversation.convType === 'personal' ? (conversation.avatar || UserAvatarImg): (conversation.convAvatar || GroupAvatarImg)} alt="" />
            </div>
            <div className="message-box__center">
                <span className="message-box-name">
                    {conversation.convType === 'personal' ? conversation.recipients[0].username : conversation.convName}
                </span>
                {
                    <div className="message-box-description">
                        <span className="message-content">
                            {conversation.text ? conversation.text : ''}
                        </span>
                        <span className="message-time">
                            2 ngày
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
        </div>
    );
}

export default MessageItem;