import React from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import moment from 'moment';

function StoriesItem({
    story, 
    setStoriesCurrIndex, 
    activeStatus, 
    seenStatus
}) {
    return (
        <div 
            className={`stories-item ${activeStatus ? '--active' : ''}`} 
            onClick={setStoriesCurrIndex}
        >
            <div 
                className={`stories-item__avatar ${seenStatus ? '--seen' : ''}`}
            >
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