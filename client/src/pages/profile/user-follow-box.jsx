import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import imgtest from '../../assets/images/post-image.jpg';
import clickOutsideRef from '../../utils/dropdown-event';

function UserFollowBox(props) {
    const toolIconRef = useRef(null);
    const toolListRef = useRef(null);

    useEffect(()=>{
        clickOutsideRef(toolListRef, toolIconRef, null);
    },[])
    return (
        <div className="user-follow-item">
            <Link to="/vv" className="user-follow-item__avatar">
                <img src={imgtest} alt="" />
            </Link>
            <div className="user-follow-item__info">
                <Link to="/v">Phan Văn Thịnh</Link>
                <span>Thịnh DUBAI</span>
            </div>
            <div className="user-follow-item__tool">
                <div className="tool-icon" ref={toolIconRef}>
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <ul className="tool-list" ref={toolListRef}>
                    <li className="tool-item">
                        <span className="tool-item__icon">
                            <i class="fas fa-user-slash"></i>
                        </span>
                        <span className="tool-item__content">
                            Unfollow
                        </span>
                    </li>
                    <li className="tool-item">
                        <span className="tool-item__icon">
                            <i class="fas fa-ban"></i>
                        </span>
                        <span className="tool-item__content">
                            Block
                        </span>
                    </li>
                    <li className="tool-item">
                        <span className="tool-item__icon">
                            <i class="fas fa-comment-alt"></i>
                        </span>
                        <span className="tool-item__content">
                            Message
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserFollowBox;