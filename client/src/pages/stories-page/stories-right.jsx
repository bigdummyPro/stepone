import React, { useEffect, useRef, useState } from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import ProgressTimeOut from './progressTimeOut';

function StoriesRight({
    storiesLeftStatus, 
    openStoriesLeft, 
    authStories,
    otherStories,
    currStoriesIndex,
    handleStoriesCurrIndex
}) {
    const [currIndex, setCurrIndex] = useState(0);
    const [allStories, setAllStories] = useState([]);
    const [currStories, setCurrStories] = useState([]);
    const [currChildStoriesIndex, setCurrChildStoriesIndex] = useState(0);

    const storiesTimeOutRef = useRef(null);
    const storageChildIndex = useRef(0);
    const storageParentIndex = useRef(0);
    const handleChangeChildStories = (number) => {
        if(storageChildIndex.current + number > currStories.length - 1){
            console.log(allStories.length)
            console.log(currStories)
            console.log(storageParentIndex.current)
            if(storageParentIndex.current + 1 < allStories.length){console.log('dit')
                handleStoriesCurrIndex(prevIndex => prevIndex + 1);
                storageParentIndex.current = storageParentIndex.current + 1;
            }else{
                handleStoriesCurrIndex(0);
            }
            setCurrChildStoriesIndex(0);
            storageChildIndex.current = 0;
        }else{
            setCurrChildStoriesIndex(prev => prev + number);
            storageChildIndex.current = storageChildIndex.current + number;
        }
    }
    useEffect(()=>{
        setCurrIndex(currStoriesIndex);

        const allStories = [...otherStories];
        allStories.unshift([...authStories]);
        setAllStories(allStories)

        if(allStories.length > 0)
        setCurrStories(allStories[currStoriesIndex]);
    },[authStories, otherStories, currStoriesIndex])

    useEffect(()=>{
        if(currStories.length > 0){
            storageParentIndex.current = currIndex;
            let time = 0;
            storiesTimeOutRef.current = setInterval(()=>{
                time++;
                if(time === 5) {
                    time = 0;
                    handleChangeChildStories(1);
                }
            }, 250)
        }
        return ()=>{
            clearInterval(storiesTimeOutRef.current);
        }
    },[currStories.length, currIndex, allStories.length])


    return (
        <div className="stories-right-wrapper">
            <div className="stories-right">
                <div className="stories-right__main">
                    <ProgressTimeOut 

                    />
                    <div className="stories-right-description">
                        <div className="description-user">
                            <img src={(currStories.length > 0 && currStories[currChildStoriesIndex].user.avatar) || UserAvatarImg} alt="" />
                            <span>
                                {currStories.length > 0 && currStories[currChildStoriesIndex].user.username}
                            </span>
                        </div>
                        <div className="description-tool">
                            <div className="desciption-tool-item description-tool__play">
                                <span><i className="fas fa-play"></i></span>
                                {/* <span><i className="fas fa-pause"></i></span> */}
                            </div>
                            <div className="desciption-tool-item description-tool__more">
                                <span>
                                    <i className="fas fa-ellipsis-h"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    {
                        currStories && currStories.length > 0 && 
                        <div className="stories-right-body">
                            <div className="stories-right-body__img">
                                <img src={currStories[currChildStoriesIndex].background} alt="" />
                            </div>
                            <span className="stories-right-body__text">
                                {
                                   currStories[currChildStoriesIndex].content 
                                }
                            </span>
                        </div>
                    }
                    <div className="stories-right-footer">

                    </div>
                </div>
                <span className="stories-right__prev">
                    <i className="fas fa-chevron-left"></i>
                </span>
                <span className="stories-right__next">
                    <i className="fas fa-chevron-right"></i>
                </span>
                {
                    !storiesLeftStatus ?
                    <span 
                        className="stories-right__open-left"
                        onClick={openStoriesLeft}
                    >
                        <i className="fas fa-caret-square-right"></i>
                    </span> : null
                }
            </div>
        </div>
    );
}

export default StoriesRight;