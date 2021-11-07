import React, { useRef } from 'react';
import clickOutsideRef from '../../utils/dropdown-event';
import GirlImg from './../../assets/images/girl.png';

function PostHeader(props) {

    const dropdown_content_el = useRef(null);
    const dropdown_toggle_el = useRef(null);

    clickOutsideRef(dropdown_content_el, dropdown_toggle_el);
    return (
        <div className="post-item__header">
            <a href="#vv" className="post-header-avatar">
                <img src={GirlImg} alt="" />
            </a>
            <div className="post-header-name">
                <a href="#vv">Nguyễn Hoàng Khánh Ngân</a>
                <span>28 tháng 10 lúc 12:17</span>
            </div>
            <div className="post-header-tool">
                <span className="post-header-tool__icon" ref={dropdown_toggle_el}>
                    <i className="fas fa-ellipsis-h"></i>
                </span>
                <div className="post-header-tool__list" ref={dropdown_content_el}>
                    <div className="post-tool-item">
                        <span><i className="fas fa-marker"></i></span>
                        <span>Update post</span>
                    </div>
                    <div className="post-tool-item">
                        <span><i className="fas fa-trash"></i></span>
                        <span>Delete post</span>
                    </div>
                    <div className="post-tool-item">
                        <span><i className="fas fa-thumbtack"></i></span>
                        <span>Pin post</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostHeader;