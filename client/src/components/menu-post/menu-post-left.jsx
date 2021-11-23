import React from 'react';
import { useDispatch } from 'react-redux';
import GirlImg from './../../assets/images/girl.png';
import {GLOBALTYPES} from './../../redux/constants/globalTypes';

function MenuPostLeft({}) {
    const dispatch = useDispatch();
    const openModal = () => {
        dispatch({type: GLOBALTYPES.FILE_MODAL_IN_CREATE_POST, payload: false})
        dispatch({type: GLOBALTYPES.CREATE_POST_MODAL_STATUS, payload: true})
    }
    return (
        <div className="menu-post__left">
            <a href="#vv" className="menu-post-left-avatar">
                <img src={GirlImg} alt="" />
            </a>
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