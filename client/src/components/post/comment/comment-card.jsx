import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import UserAvatarImg from '../../../assets/images/user-avatar.png';
import LikeImg from '../../../assets/images/like.png';
import moment from 'moment'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, likeComment, unLikeComment } from '../../../redux/actions/commentAction';

function CommentCard({levelKey, handleReply, comment, post}) {
    const [isLike, setIsLike] = useState(false);
    const [editMenuStatus, setEditMenuStatus] = useState(false);
    const [editIconStatus, setEditIconStatus] = useState(false);

    const authState = useSelector(state => state.authReducer);
    const socketState = useSelector(state => state.socketReducer);
    const dispatch = useDispatch();

    const handleMouseEnter = (e) => {
        if(!editIconStatus) setEditIconStatus(true);
    }
    const handleMouseLeave = (e) => {
        if(editIconStatus) setEditIconStatus(false);
        if(editMenuStatus) setEditMenuStatus(false);
    }

    const handleLike = async() => {
        setIsLike(true);
        await dispatch(likeComment({comment, post, auth: authState}))
    }
    const handleUnLike = async () => {
        setIsLike(false);
        await dispatch(unLikeComment({comment, post, auth: authState}))
    }

    const handleDeleteComment = () => {
        dispatch(deleteComment({post, comment, socket: socketState}))
    }

    useEffect(()=>{
        if(comment.likes.find(like => like._id === authState.user._id)){
            setIsLike(true);
        }
    },[authState.user._id, comment.likes])
    return (
        <div 
            className={`comment-box-item--style comment-box-item__lv${levelKey}`}
        >
            {
                levelKey === 3 ? 
                    <div className="comment-box-curve"></div> :
                    <div className="comment-box-line"></div>
            }
            <Link 
                to={`/profile/${comment.user._id}/post`} className="comment-box-avatar"
            >
                <img src={comment.user.avatar || UserAvatarImg} alt="" />
            </Link>
            <div className="comment-box-body">
                <div 
                    className="comment-box-body__content"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link 
                        to={`/profile/${comment.user._id}/post`} className="comment-content-name"
                    >
                        {comment.user.username}
                    </Link>
                    <span className="comment-content-text">
                        {
                            comment.tag ?
                                <Link
                                    to={`/profile/${comment.tag._id}/post`} 
                                >
                                    @{comment.tag.username}
                                </Link> : null
                        }
                        {comment.content}
                    </span>
                    {
                        comment.likes.length > 0 ?
                            <span className="comment-content-like-count">
                                <span>
                                    <img src={LikeImg} alt="" />
                                </span>
                                <span>{comment.likes.length}</span>
                            </span> : null
                    }
                    {
                        comment.user._id === authState.user._id ?
                        <div className={`comment-content-edit ${editIconStatus ? '--active' : ''}`}>
                            <span 
                                className="comment-edit-icon"
                                onClick={()=>setEditMenuStatus(!editMenuStatus)}
                            >
                                <i className="fas fa-ellipsis-h"></i>
                            </span>
                            <ul className={`comment-edit-menu ${editMenuStatus ? '--active' : ''}`}>
                                <li className="comment-edit-item">
                                    Update
                                </li>
                                <li 
                                    className="comment-edit-item"
                                    onClick={handleDeleteComment}
                                >
                                    Delete
                                </li>
                            </ul>
                        </div> : null
                    }
                </div>
                <div className="comment-box-body__tool">
                    {
                        isLike ?
                            <span 
                                className="comment-tool comment-tool-like --active"
                                onClick={handleUnLike}
                            >
                                Like
                            </span> :
                            <span 
                                className="comment-tool comment-tool-like"
                                onClick={handleLike}
                            >
                                Like
                            </span>
                    }
                    <span 
                        className="comment-tool comment-tool-reply"
                        onClick={()=>handleReply(comment)}
                    >
                        Reply
                    </span>
                    <span className="comment-tool comment-tool-time">
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CommentCard;