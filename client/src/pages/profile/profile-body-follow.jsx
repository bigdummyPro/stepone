import React, { useState } from 'react';
import UserFollowBox from './user-follow-box';


const tabMenuItems = ['Followers', 'Following'];

function ProfileBodyFollow(props) {
    const [tabMenuActive, setTabMenuActive] = useState(0);

    const handleTabMenuItem = (index) => {
        setTabMenuActive(index)
    }
    return (
        <div className="profile-body-follow">
            <div className="profile-follow-header">
                <div className="profile-follow-header__search">
                    <input type="text" name="" placeholder="Search in here" />
                    <span><i className="fas fa-search"></i></span>
                </div>
            </div>
            <div className="profile-follow-tab">
                <div className="profile-follow-tab__menu">
                    {
                        tabMenuItems.map((taMeIt, index)=>(
                            <div 
                                className={`tab-menu-item ${tabMenuActive === index ? '--active' : ''}`}
                                key={index}
                                onClick={()=>handleTabMenuItem(index)}
                            >
                                {taMeIt}
                            </div>
                        ))
                    }
                </div>
                <div className="profile-follow-tab__content">
                    <div className="tab-content-item">
                        <div className="user-follow-list">
                            <UserFollowBox />
                            <UserFollowBox />
                            <UserFollowBox />
                            <UserFollowBox />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileBodyFollow;