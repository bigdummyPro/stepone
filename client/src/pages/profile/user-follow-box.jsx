import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import { unfollow } from '../../redux/actions/profileAction';
import clickOutsideRef from '../../utils/dropdown-event';

function UserFollowBox({followData, typeKey}) {
    const profileState = useSelector(state => state.profileReducer);
    const authState = useSelector(state => state.authReducer);
    const socketState = useSelector(state => state.socketReducer);
    const dispatch = useDispatch();

    const toolIconRef = useRef(null);
    const toolListRef = useRef(null);

    const handleUnfollow = async () => {
        await dispatch(unfollow({users: profileState.users, user: followData, auth: authState, socket: socketState}))
    }

    useEffect(()=>{
        clickOutsideRef(toolListRef, toolIconRef, null);
    },[])
    return (
        <div className="user-follow-item">
            <Link to={`/profile/${followData._id}/post`} className="user-follow-item__avatar">
                <img src={followData.avatar || UserAvatarImg} alt="" />
            </Link>
            <div className="user-follow-item__info">
                <Link to={`/profile/${followData._id}/post`}>
                    {followData.username}
                </Link>
                <span>{followData.nickname || ''}</span>
            </div>
            <div className="user-follow-item__tool">
                <div className="tool-icon" ref={toolIconRef}>
                    <i className="fas fa-ellipsis-h"></i>
                </div>
                <ul className="tool-list" ref={toolListRef}>
                    {
                        typeKey === 0 ?
                        <li className="tool-item">
                            <span className="tool-item__icon">
                                <i className="fas fa-ban"></i>
                            </span>
                            <span className="tool-item__content">
                                Block
                            </span>
                        </li> :
                        <li className="tool-item" onClick={handleUnfollow}>
                            <span className="tool-item__icon">
                                <i className="fas fa-user-slash"></i>
                            </span>
                            <span className="tool-item__content">
                                Unfollow
                            </span>
                        </li>
                    }
                    <li className="tool-item">
                        <Link to={`/message/${followData._id}`}> 
                            <span className="tool-item-link__icon">
                                <i className="fas fa-comment-alt"></i>
                            </span>
                            <span className="tool-item-link__content">
                                Message
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserFollowBox;
