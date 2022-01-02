import React from 'react';
import { Link } from 'react-router-dom';
import UserAvatarImg from '../../assets/images/user-avatar.png';

function StoriesItem({story, user, seenStatus}) {
    return (
        <Link 
            to={`stories/${story.user._id}`} 
            className="stories-item-wrapper"
        >
            <div className="stories-item">
                <div className={`stories-item__avatar ${seenStatus ? '--seen' : ''}`}>
                    <img src={story.user.avatar || UserAvatarImg} alt="" />
                </div>
                <div className="stories-item__content">
                    <img src={story.background} alt="" />
                    <span style={{fontFamily: `${story.fontStyle}`}}>
                        {story.content.length > 70 ? story.content.slice(0, 70) + '....' : story.content}
                    </span>
                </div>
                <div className="stories-item__name">
                    {user && user._id === story.user._id ? 'Your Story' : story.user.username}
                </div>
            </div>
        </Link>
    );
}

export default StoriesItem;