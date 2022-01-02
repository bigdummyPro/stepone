import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import StoriesItem from './stories-item';

function StoriesLeft({
    closeStoriesLeft, 
    authStories, 
    otherStories,
    handleStoriesCurrIndex,
    currStoriesIndex,
    resetStoriesRight
}) {
    const dispatch = useDispatch();
    const [currIndex, setCurrIndex] = useState(0);
    const {user} = useSelector(state => state.authReducer);

    const {id} = useParams();
    const navigate = useNavigate();

    const handleCurrIndex = (index) => {
        setCurrIndex(index);
        handleStoriesCurrIndex(index);
        resetStoriesRight();
    }
    const handleOpenModal = () => {
        dispatch({type: GLOBALTYPES.CREATE_STORIES_MODAL_STATUS, payload: true});
    }

    useEffect(()=>{
        setCurrIndex(currStoriesIndex);
    },[currStoriesIndex])

    useEffect(()=>{
        const allStories = [...otherStories];
        allStories.unshift([...authStories]);

        if(id && allStories[0].length > 0) {console.log(allStories)
            const index =  allStories.findIndex(story => story.some(item => item.user._id === id));

            setCurrIndex(index);
            console.log(index)
            handleStoriesCurrIndex(index);
            resetStoriesRight();
        }
        if(!id && allStories[0].length > 0){
            navigate(`${allStories[0][0].user._id}`)
        }
    },[id])
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
                                    setStoriesCurrIndex={
                                        ()=>handleCurrIndex(0)
                                    }
                                    activeStatus={currIndex === 0}
                                    seenStatus={authStories.every(item => item.viewerIds.some(view => view._id === user._id))}
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
                                        activeStatus={currIndex === (authStories.length > 0 ? index + 1 : index)}
                                        setStoriesCurrIndex={
                                            ()=>handleCurrIndex(
                                            authStories.length > 0 ? index + 1 : index)
                                        }
                                        seenStatus={story.every(item => item.viewerIds.some(view => view._id === user._id))}
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