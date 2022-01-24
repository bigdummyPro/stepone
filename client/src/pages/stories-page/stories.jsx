import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStories, getStoriesById } from '../../redux/actions/storiesAction';
import StoriesLeft from './stories-left';
import StoriesRight from './stories-right';
import './stories.scss';

function Stories() {
    const [storiesLeftStatus, setStoriesLeftStatus] = useState(true);
    const [currStoriesIndex, setCurrStoriesIndex] = useState(0);
    const [resetStoriesRight, setResetStoriesRight] = useState(false);

    const dispatch = useDispatch();
    const {authStories, otherStories} = useSelector(state => state.storiesReducer);
    useEffect(()=>{
        dispatch(getStories());
        dispatch(getStoriesById());
    },[])
    return (
        <div className="main-content">
        <title>Stories | Stepone</title>
        <div className="main-container">
            <div className="main-body">
                <div className="stories-page-wrapper">
                    <div className={`stories ${!storiesLeftStatus ? '--hide-left' : ''}`}>
                        <StoriesLeft 
                            closeStoriesLeft={()=>setStoriesLeftStatus(false)}
                            authStories={authStories}
                            otherStories={otherStories}
                            currStoriesIndex={currStoriesIndex}
                            handleStoriesCurrIndex={
                                (index)=>setCurrStoriesIndex(index)
                            }
                            resetStoriesRight={
                                ()=>setResetStoriesRight(!resetStoriesRight)
                            }
                        />
                        <StoriesRight 
                            openStoriesLeft={()=>setStoriesLeftStatus(true)}
                            storiesLeftStatus={storiesLeftStatus}
                            authStories={authStories}
                            otherStories={otherStories}
                            currStoriesIndex={currStoriesIndex}
                            handleStoriesCurrIndex={(index)=>setCurrStoriesIndex(index)}
                            resetStoriesRight={resetStoriesRight}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Stories;
