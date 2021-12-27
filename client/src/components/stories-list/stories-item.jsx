import React from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';

function StoriesItem(props) {
    return (
        <div className="stories-item-wrapper">
            <div className="stories-item">
                <div className="stories-item__avatar">
                    <img src={UserAvatarImg} alt="" />
                </div>
                <div className="stories-item__content">
                    <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617273/SocialWebsite/Stories-Bg-Img/b-bg09_og8bh0.jpg" alt="" />
                    <span></span>
                </div>
                <div className="stories-item__name">
                    Nguyễn Hoàng Khánh Ngân
                </div>
            </div>
        </div>
    );
}

export default StoriesItem;