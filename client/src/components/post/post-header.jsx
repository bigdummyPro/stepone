import React from 'react';
import GirlImg from './../../assets/images/girl.png';

function PostHeader(props) {
    return (
        <div className="post-item__header">
            <div className="post-header-avatar">
                <img src={GirlImg} alt="" />
            </div>
            <div className="post-header-name">
                <span>Nguyễn Hoàng Khánh Ngân</span>
                <span>28 tháng 10 lúc 12:17</span>
            </div>
            <div className="post-header-tool">
                <span className="post-header-tool__icon">
                    <i className="fas fa-ellipsis-h"></i>
                </span>
            </div>
        </div>
    );
}

export default PostHeader;