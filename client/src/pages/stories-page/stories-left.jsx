import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStories, getStoriesById } from '../../redux/actions/storiesAction';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import StoriesItem from './stories-item';

function StoriesLeft({closeStoriesLeft}) {
    const dispatch = useDispatch();
    const {authStories, otherStories} = useSelector(state => state.storiesReducer);

    const handleOpenModal = () => {
        dispatch({type: GLOBALTYPES.CREATE_STORIES_MODAL_STATUS, payload: true});
    }
    useEffect(()=>{
        dispatch(getStories());
        dispatch(getStoriesById());
    },[])
    return (
        <div className="stories-left-wrapper">
            <div className="stories-left">
                <div className="stories-left__header">
                    <span className="stories-header-title">
                        Stories
                    </span>
                    <span 
                        className="stories-header-toggle"
                        onClick={closeStoriesLeft}
                    >
                        <i className="fas fa-caret-square-left"></i>
                    </span>
                </div>
                <div className="stories-left__create">
                    <span className="stories-create-text">
                        Create new
                    </span>
                    <span 
                        className="stories-create-icon"
                        onClick={handleOpenModal}
                    >
                        <i className="fas fa-plus"></i>
                    </span>
                </div>
                <div className="stories-left__body">
                    <div className="stories-body-group">
                        <div className="stories-group-title">
                            Your stories
                        </div>
                        <div className="stories-group-list">
                            {
                                authStories.length > 0 &&
                                <StoriesItem 
                                    story={authStories[0]}
                                />
                            }
                        </div>
                    </div>
                    <div className="stories-body-group">
                        <div className="stories-group-title">
                            All stories
                        </div>
                        <div className="stories-group-list">
                            {
                                otherStories.length > 0 && otherStories.map((story, index)=>(
                                    <StoriesItem 
                                        key={index}
                                        story={story[0]}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoriesLeft;