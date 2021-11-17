import React from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';

function MenuPostRight() {
    const dispatch = useDispatch();

    const openImageVideoModal = () => {
        dispatch({type: GLOBALTYPES.CREATE_POST_MODAL_STATUS, payload: true});
        dispatch({type: GLOBALTYPES.FILE_MODAL_IN_CREATE_POST, payload: true});
        dispatch({type: GLOBALTYPES.INIT_FILE_MODAL_TYPE, payload: 0})
    }
    return (
        <div className="menu-post__right">
            <ul className="menu-post-right-list">
                <li className="menu-post-right-item">
                    <span className="red-icon"><i className="fas fa-video"></i></span>
                    <span>Livestream</span>
                </li>
                <li className="menu-post-right-item" onClick={openImageVideoModal}>
                    <span className="green-icon"><i className="fas fa-images"></i></span>
                    <span>Image/Video</span>
                </li>
                <li className="menu-post-right-item">
                    <span className="orange-icon"><i className="far fa-grin-stars"></i></span>
                    <span>Emotion</span>
                </li>
            </ul>
        </div>
    );
}

export default MenuPostRight;