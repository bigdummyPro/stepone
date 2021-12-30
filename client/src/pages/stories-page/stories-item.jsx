import React from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import moment from 'moment';

function StoriesItem({story}) {
    return (
        <div className="stories-item">
            <div className="stories-item__avatar">
                <img src={story.user.avatar || UserAvatarImg} alt="" />
            </div>
            <div className="stories-item__info">
                <span className="stories-info-name">
                    {story.user.username}
                </span>
                <span className="stories-info-time">
                    {moment(story.createdAt).fromNow()}
                </span>
            </div>
        </div>
    );
}

export default StoriesItem;