import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import UserAvatarImg from './../../assets/images/user-avatar.png';
import {GLOBALTYPES} from './../../redux/constants/globalTypes';

function MenuPostLeft() {
    const dispatch = useDispatch();
    const openModal = () => {
        dispatch({type: GLOBALTYPES.FILE_MODAL_IN_CREATE_POST, payload: false})
        dispatch({type: GLOBALTYPES.CREATE_POST_MODAL_STATUS, payload: true})
    }
    const authState = useSelector(state => state.authReducer);

    return (
        <div className="menu-post__left">
            <Link to={`/profile/${authState.user._id}/post`} className="menu-post-left-avatar">
                <img src={authState.user.avatar || UserAvatarImg} alt="" />
            </Link>
            <div className="menu-post-left-action" onClick={openModal}>
                <div className="action-btn">
                    <i className="fas fa-pencil-alt"></i>
                    What do you think?
                </div>
            </div>
        </div>
    );
}

export default MenuPostLeft;