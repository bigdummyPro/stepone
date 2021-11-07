import React from 'react';
import GirlImage from './../../assets/images/girl.png'
import PostImage from './../../assets/images/post-image.jpg';

function SavedPost(props) {
    return (
        <div className="sidebar-right__saved-post">
            <div className="saved-post-title">
                <span>Saved Posts</span>
                <a href="#vv">See All</a>
            </div>
            <a href="#vv" className="saved-post-content">
                <div className="post-content-avatar">
                    <img src={GirlImage} alt="" />
                    <span className="post-content-avatar__name">
                        Lê Hoàng Ánh Tuyết
                    </span>
                </div>
                <div className="post-content-text">
                    TV Neo QLED x Loa thanh Q-Series - Combo chiến game bất bại! Là tín đồ mê game, sao có thể bỏ qua tuyệt tác chiến game TV Neo
                </div>
                <div className="post-content-img">
                    <img src={PostImage} alt="" />
                </div>
            </a>
        </div>
    );
}

export default SavedPost;