import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import { updateStoriesViewer } from '../../redux/actions/storiesAction';
import ProgressTimeOut from './progressTimeOut';
import StoriesRightTool from './stories-right-tool';
import test from '../../assets/images/emotion-svg/haha.svg';

function StoriesRight({
    storiesLeftStatus, 
    openStoriesLeft, 
    authStories,
    otherStories,
    currStoriesIndex,
    handleStoriesCurrIndex,
    resetStoriesRight
}) {
    const [currIndex, setCurrIndex] = useState(null);
    const [allStories, setAllStories] = useState([]);
    const [currStories, setCurrStories] = useState([]);
    const [currChildStoriesIndex, setCurrChildStoriesIndex] = useState(0);
    const [progressStatus, setProgressStatus] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    const togglePlayStatus = useRef(true);

    const storiesTimeOutRef = useRef(null);
    const storageChildIndex = useRef(0);
    const storageParentIndex = useRef(0);

    const {user} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const handleNextChildStories = (number) => {
        setProgressStatus(!progressStatus)
        console.log(currStories)
        
        if(storageChildIndex.current + number > currStories.length - 1){
            if(storageParentIndex.current + number < allStories.length){
                storageParentIndex.current = storageParentIndex.current + number;
                console.log(storageChildIndex.current)
                handleStoriesCurrIndex(storageParentIndex.current);
                setCurrChildStoriesIndex(0);
                storageChildIndex.current = 0;
            }else{
                console.log('End');

                togglePlayStatus.current = false;
                setCurrChildStoriesIndex(currStories.length - 1)
                clearInterval(storiesTimeOutRef.current);
            }
        }else{
            setCurrChildStoriesIndex(prev => prev + number);
            storageChildIndex.current = storageChildIndex.current + number;
        }
        
    }

    const handlePrevChildStories = (number) => {
        setProgressStatus(!progressStatus)
        if(storageChildIndex.current + number < 0){
            if(storageParentIndex.current >= 0){
                handleStoriesCurrIndex(storageParentIndex.current + number);
                storageParentIndex.current = storageParentIndex.current + number;

                setCurrChildStoriesIndex(allStories[storageParentIndex.current].length - 1);
                storageChildIndex.current = allStories[storageParentIndex.current].length - 1;
            }else{
                setCurrChildStoriesIndex(0)
                clearInterval(storiesTimeOutRef.current);
            }
        }else{
            setCurrChildStoriesIndex(prev => prev + number);
            storageChildIndex.current = storageChildIndex.current + number;
        }
    }
    useEffect(()=>{console.log('bug')     
        //if(firstLoad){
            setCurrIndex(currStoriesIndex);
            const allStories = [...otherStories];
            allStories.unshift([...authStories]);
            setAllStories(allStories);

            if(allStories[0].length > 0){
                setCurrStories(allStories[currStoriesIndex]);
            }
        //}
    },[authStories, otherStories, currStoriesIndex])

    useEffect(()=>{
        if(currStories && currStories.length > 0){
            storageParentIndex.current = currIndex;
            let time = 0;
            storiesTimeOutRef.current = setInterval(()=>{
                // console.log('time'+ time)
                if(togglePlayStatus.current){
                    time = time + 1;
                    if(time === 10) {
                        time = 0;
                        handleNextChildStories(1);
                    }
                }
            }, 600)
        }
        return ()=>{
            clearInterval(storiesTimeOutRef.current);
        }
    },[currStories, currIndex, allStories.length, progressStatus])

    // reset all stories right when click on left menu
    useEffect(()=>{
        if(storiesTimeOutRef.current) clearInterval(storiesTimeOutRef.current);
        setCurrChildStoriesIndex(0);
        setProgressStatus(!progressStatus)
    },[resetStoriesRight])

    //Update viewer stories
    useEffect(()=>{
        (async () => {console.log('dit')
            if(!currStories[currChildStoriesIndex]) return;
            if(!currStories[currChildStoriesIndex].viewerIds.includes(user._id)){
                //&& currStories[currChildStoriesIndex].user._id !== user._id
                console.log(currStories[currChildStoriesIndex])
                await dispatch(updateStoriesViewer({
                    id: currStories[currChildStoriesIndex]._id, 
                    user
                }))
            }
        })();
    },[currChildStoriesIndex])
    return (
        <div className="stories-right-wrapper">
            <div className="stories-right">
                <div className="stories-right__main">
                    <ProgressTimeOut 
                        stories={currStories}
                        currIndex={currChildStoriesIndex}
                        status={progressStatus}
                        togglePlayStatus={togglePlayStatus}
                    />
                    <div className="stories-right-description">
                        <div className="description-user">
                            <img src={(currStories && currStories.length > 0 ? currStories[currChildStoriesIndex].user.avatar : null) || UserAvatarImg} alt="" />
                            <span>
                                {currStories && currStories.length > 0 ? currStories[currChildStoriesIndex].user.username : null}
                            </span>
                        </div>
                        <StoriesRightTool 
                            togglePlayStatus={togglePlayStatus}
                        />
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
                        {
                            currStories[currChildStoriesIndex]?.user._id === user._id ?
                            <div className="storie-right-footer__viewer-count">
                                <span>
                                    <b>
                                        {currStories && currStories[currChildStoriesIndex]?.viewerIds.filter(item => item._id !== user._id).length}
                                    </b> Viewers
                                </span>
                                <span>
                                    <b>
                                        {currStories && currStories[currChildStoriesIndex]?.likeIds.filter(item => item._id !== user._id).length}
                                    </b> Emotions
                                </span>
                            </div> : null
                        }
                        {
                            currStories[currChildStoriesIndex]?.user._id !== user._id ?
                            <div className="storie-right-footer__emotion-tool">
                                <div className="emotion-tool-list">
                                    <div className="emotion-tool-item">
                                        <img src={test} alt="" />
                                    </div>
                                    <div className="emotion-tool-item">
                                        <img src={test} alt="" />
                                    </div>
                                    <div className="emotion-tool-item">
                                        <img src={test} alt="" />
                                    </div>
                                    <div className="emotion-tool-item">
                                        <img src={test} alt="" />
                                    </div>
                                    <div className="emotion-tool-item">
                                        <img src={test} alt="" />
                                    </div>
                                    <div className="emotion-tool-item">
                                        <img src={test} alt="" />
                                    </div>
                                </div>
                            </div> : null
                        }
                    </div>
                </div>
                {
                    currIndex === 0 && currChildStoriesIndex === 0 ? null :
                    <span 
                        className="stories-right__prev"
                        onClick={()=>handlePrevChildStories(-1)}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </span>
                }
                {
                    currIndex === allStories.length - 1 && currChildStoriesIndex === currStories.length - 1 ? null :
                    <span 
                        className="stories-right__next"
                        onClick={()=>handleNextChildStories(1)}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </span>
                }
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