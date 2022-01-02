import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import StoriesItem from './stories-item';
import './stories-list.scss';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import {getStories, getStoriesById} from '../../redux/actions/storiesAction';

function StoriesList(props) {
    const dispatch = useDispatch();
    const {authStories, otherStories} = useSelector(state => state.storiesReducer);
    const {user} = useSelector(state => state.authReducer);

    const handleOpenModal = () => {
        dispatch({type: GLOBALTYPES.CREATE_STORIES_MODAL_STATUS, payload: true});
    }

    useEffect(()=>{
        dispatch(getStories());
        dispatch(getStoriesById());
    },[])
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
                                    <img src={user.avatar ||UserAvatarImg} alt="" />
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
                    {
                        authStories.length > 0 && 
                        <StoriesItem 
                            story={authStories[0]}
                            user={user}
                            seenStatus={authStories.every(item => item.viewerIds.some(view => view._id === user._id))}
                        />
                    }
                    {
                        otherStories.length > 0 && otherStories.map((story, index) => (
                            <StoriesItem 
                                key={index}
                                story={story[0]}
                                user={user}
                                seenStatus={story.every(item => item.viewerIds.some(view => view._id === user._id))}
                            />
                        ))
                    }
                </div>
                {
                    authStories.length <= 0 && otherStories.length <= 0 ? null :
                    <Link
                        to={`/stories`} 
                        className="stories-see-all"
                    >
                        <i className="fas fa-long-arrow-alt-right"></i>
                    </Link>
                }
            </div>
        </div>
    );
}

export default StoriesList;