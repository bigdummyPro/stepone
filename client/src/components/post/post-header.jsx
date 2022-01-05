import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clickOutsideRef from '../../utils/dropdown-event';
import UserAvatarImg from './../../assets/images/user-avatar.png';
import moment from 'moment';
import {deletePost} from '../../redux/actions/postAction';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';

function PostHeader({user, createdAt, post, auth, dispatch, socket}) {

    const dropdown_content_el = useRef(null);
    const dropdown_toggle_el = useRef(null);

    const handleDeletePost = () => {
        dropdown_content_el.current.classList.remove('--active');
        dispatch(deletePost({post, auth, socket}));
    }
    const handleEditPost = () => {
        dispatch({type: GLOBALTYPES.CREATE_POST_MODAL_EDIT, payload: {
            status: true,
            data: post
        }})
        dispatch({type: GLOBALTYPES.CREATE_POST_MODAL_STATUS, payload: true})
    }
    useEffect(()=>{
        clickOutsideRef(dropdown_content_el, dropdown_toggle_el, null);
        return () => clickOutsideRef(dropdown_content_el, dropdown_toggle_el, null);
    },[])

    return (
        <div className="post-item__header">
            <Link to={`/profile/${user._id}/post`} className="post-header-avatar">
                <img src={user.avatar || UserAvatarImg} alt="" />
            </Link>
            <div className="post-header-name">
                <Link to={`/profile/${user._id}/post`}>
                    {user.username}
                </Link>
                <span>
                    {moment(createdAt).fromNow()}
                </span>
            </div>
            {
                user._id === auth.user._id ?
                    <div className="post-header-tool">
                        <span className="post-header-tool__icon" ref={dropdown_toggle_el}>
                            <i className="fas fa-ellipsis-h"></i>
                        </span>
                        <div className="post-header-tool__list" ref={dropdown_content_el}>
                            <div 
                                className="post-tool-item"
                                onClick={handleEditPost}
                            >
                                <span><i className="fas fa-marker"></i></span>
                                <span>Update post</span>
                            </div>
                            <div 
                                className="post-tool-item"
                                onClick={handleDeletePost}
                            >
                                <span><i className="fas fa-trash"></i></span>
                                <span>Delete post</span>
                            </div>
                            <div className="post-tool-item">
                                <span><i className="fas fa-thumbtack"></i></span>
                                <span>Pin post</span>
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    );
}

export default PostHeader;