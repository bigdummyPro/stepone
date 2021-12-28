import React from 'react';
import StoriesItem from './stories-item';
import './stories-list.scss';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';

function StoriesList(props) {
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        dispatch({type: GLOBALTYPES.CREATE_STORIES_MODAL_STATUS, payload: true});
    }
    return (
        <div className="stories-wrapper">
            <div className="stories-list-container">
                <div className="stories-list">
                    <div className="stories-item-wrapper">
                        <div 
                            className="stories-item-host"
                            onClick={handleOpenModal}
                        >
                            <div className="stories-item-host__avatar">
                                <div className="host-avatar-img">
                                    <img src={UserAvatarImg} alt="" />
                                </div>
                            </div>
                            <div className="stories-item-host__create">
                                <span className="create-icon">
                                    <i className="fas fa-plus"></i>
                                </span>
                                <span className="create-text">
                                    Create Stories
                                </span>
                            </div>
                        </div>
                    </div>
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                    <StoriesItem />
                </div>
                <span className="stories-see-all">
                    <i className="fas fa-long-arrow-alt-right"></i>
                </span>
            </div>
        </div>
    );
}

export default StoriesList;