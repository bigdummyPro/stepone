import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import StoryImg from '../../assets/images/story.png';
import { updateStoriesViewer } from '../../redux/actions/storiesAction';
import ProgressTimeOut from './progressTimeOut';
import StoriesRightTool from './stories-right-tool';
import ViewerCount from './viewer-count';
import EmotionTool from './emotion-tool';

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
    const [deleteStatus, setDeleteStatus] = useState(false);
    

    const storiesTimeOutRef = useRef(null);
    const storageChildIndex = useRef(0);
    const storageParentIndex = useRef(0);
    const deleteStatusStorage = useRef(false);

    const {user} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const [progressPerc, setProgressPerc] = useState(0);
    const [endStatus, setEndStatus] = useState(false);
    const togglePlayStatusRef = useRef(true);

    const handleNextChildStories = (number, currStoriesDelete) => {
        if(storageChildIndex.current + number > (currStoriesDelete ? currStoriesDelete : currStories).length - 1){
            if(storageParentIndex.current + number < allStories.length){

                storageParentIndex.current = storageParentIndex.current + number;
                handleStoriesCurrIndex(storageParentIndex.current);

                setCurrChildStoriesIndex(0);
                storageChildIndex.current = 0;

                timeRef.current = 0;
                setProgressPerc(0);
            }else{
                setEndStatus(true);
                handleStoriesCurrIndex(null);

                storageChildIndex.current = 0;

                clearInterval(storiesTimeOutRef.current);

                timeRef.current = 100;
                setProgressPerc(100);
            }
        }else{
            setCurrChildStoriesIndex(prev => prev + number);
            storageChildIndex.current = storageChildIndex.current + number;
            
            timeRef.current = 0;
            setProgressPerc(0);
        }
        setDeleteStatus(false);
    }

    const handlePrevChildStories = (number) => {

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
        timeRef.current = 0;
        setProgressPerc(0);
    }
    useEffect(()=>{ 
        const allStoriesStorage = [...otherStories];

        if([...authStories].length > 0) 
        allStoriesStorage.unshift([...authStories]);

        if(allStoriesStorage[0]?.length > 0){
            setCurrStories(allStoriesStorage[currStoriesIndex]);
            setCurrIndex(currStoriesIndex);
            setAllStories(allStoriesStorage);
        }else{
            setDeleteStatus(false)
            setCurrStories([]);
            timeRef.current = 0;
            setProgressPerc(0);
            setEndStatus(true);
        }
        if(deleteStatus && (storageChildIndex.current > 0 || currStories.length <= 0)) {
            handleNextChildStories(1, allStoriesStorage[currStoriesIndex]);
        }
    },[authStories, otherStories, currStoriesIndex])

    const timeRef = useRef(0);

    useEffect(()=>{
        if(currStories && currStories.length > 0){

            storageParentIndex.current = currIndex;
            setEndStatus(false);

            storiesTimeOutRef.current = setInterval(()=>{
                if(togglePlayStatusRef.current){
                    timeRef.current = timeRef.current + 1;

                    setProgressPerc(timeRef.current)
                    if(timeRef.current === 100) {
                        handleNextChildStories(1);
                    }
                }
            }, 70)
        }
        return ()=>{
            clearInterval(storiesTimeOutRef.current);
        }
    },[currStories, currStoriesIndex, currIndex, allStories.length])
    // reset all stories right when click on left menu
    useEffect(()=>{
        if(storiesTimeOutRef.current) clearInterval(storiesTimeOutRef.current);
        if(!togglePlayStatusRef.current) togglePlayStatusRef.current = true;
        
        setEndStatus(false);
        setProgressPerc(0);
        timeRef.current = 0;

        setCurrChildStoriesIndex(0);
        storageChildIndex.current = 0;
    },[resetStoriesRight])

    //Update viewer stories
    useEffect(()=>{
    (async () => {
            if(!currStories || !currStories[currChildStoriesIndex]) return;
            if(currStories[currChildStoriesIndex].viewerIds.every(item => item._id !== user._id)){
                //&& currStories[currChildStoriesIndex].user._id !== user._id
                await dispatch(updateStoriesViewer({
                    id: currStories[currChildStoriesIndex]._id, 
                    user
                }))
            }
        })();
    },[currChildStoriesIndex, currStories])
    return (
        <div className="stories-right-wrapper">
            {
                !endStatus && currStories?.length > 0 ?
                <div className="stories-right">
                    <div className="stories-right__main">
                        <ProgressTimeOut 
                            stories={currStories}
                            currIndex={currChildStoriesIndex}
                            progress={progressPerc}
                        />
                        <div className="stories-right-description">
                            <div className="description-user">
                                <img src={(currStories && currStories.length > 0 ? currStories[currChildStoriesIndex].user.avatar : null) || UserAvatarImg} alt="" />
                                <span>
                                    {currStories && currStories.length > 0 ? currStories[currChildStoriesIndex].user.username : null}
                                </span>
                            </div>
                            <StoriesRightTool 
                                togglePlayStatus={togglePlayStatusRef}
                                dispatch={dispatch}
                                isAuth={currStories && currStories.length > 0 ?(currStories[currChildStoriesIndex].user._id === user._id) : null}
                                storiesID={currStories && currStories.length > 0 && currStories[currChildStoriesIndex]._id}
                                handleDeleteStatus={()=>{
                                    setDeleteStatus(true)
                                    deleteStatusStorage.current = true
                                    timeRef.current = 0;
                                    setProgressPerc(0);
                                }}
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
                                <ViewerCount 
                                    currStories={currStories}
                                    currChildStoriesIndex={currChildStoriesIndex}
                                    user={user}
                                /> : null
                            }
                            {
                                currStories[currChildStoriesIndex]?.user._id !== user._id ?
                                <EmotionTool 
                                    currStories={currStories}
                                    currChildStoriesIndex={currChildStoriesIndex}
                                    user={user}
                                    dispatch={dispatch}
                                /> : null
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
                </div> : 
                <div className="stories-right-finish">
                    <img src={StoryImg} alt="" />
                    <span>Select stories to display</span>
                </div>
            }
        </div>
    );
}

export default StoriesRight;