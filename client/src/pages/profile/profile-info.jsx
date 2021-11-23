import React from 'react';
import GirlImg from '../../assets/images/post-image.jpg';

function ProfileInfo(props) {
    return (
        <div className="profile-info">
            <div className="profile-info__avatar">
                <img src={GirlImg} alt="" />
            </div>
            <div className="profile-info__content">
                <div className="profile-info-name">
                    Nguyễn Hoàng Khánh Ngân
                </div>
                <div className="profile-info-friend">
                    10 bạn bè
                </div>
            </div>  
            <div className="profile-info__tool">
                <i className="fas fa-pencil-alt"></i>
                Edit your profile
            </div>
        </div>
    );
}

export default ProfileInfo;