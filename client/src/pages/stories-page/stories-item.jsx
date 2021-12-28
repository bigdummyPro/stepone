import React from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';

function StoriesItem(props) {
    return (
        <div className="stories-item">
            <div className="stories-item__avatar">
                <img src={UserAvatarImg} alt="" />
            </div>
            <div className="stories-item__info">
                <span className="stories-info-name">
                    Nguyễn Hoàng Khánh Ngân
                </span>
                <span className="stories-info-time">
                    20 minutes ago
                </span>
            </div>
        </div>
    );
}

export default StoriesItem;