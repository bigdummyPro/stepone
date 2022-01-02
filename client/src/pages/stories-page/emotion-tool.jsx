import React, { useEffect, useRef, useState } from 'react';
import './emotion-bubble.scss';
import HahaEmotion from '../../assets/images/emotion-svg/haha.svg';
import HeartEmotion from '../../assets/images/emotion-svg/heart.svg';
import LikeEmotion from '../../assets/images/emotion-svg/like.svg';
import LovelyEmotion from '../../assets/images/emotion-svg/lovely.svg';
import CryEmotion from '../../assets/images/emotion-svg/cry.svg';
import WowEmotion from '../../assets/images/emotion-svg/wow.svg';
import { updateStoriesLike } from '../../redux/actions/storiesAction';

const emotionList = [
    {
        type: "heart",
        icon: HeartEmotion
    },
    {
        type: "like",
        icon: LikeEmotion
    },
    {
        type: "haha",
        icon: HahaEmotion
    },
    {
        type: "lovely",
        icon: LovelyEmotion
    },
    {
        type: "sad",
        icon: CryEmotion
    },
    {
        type: "wow",
        icon: WowEmotion
    }
]

function EmotionTool({currStories, currChildStoriesIndex, user, dispatch}) {
    const [emotionActive, setEmotionActive] = useState(null);
    const [bubbleStatus, setBubbleStatus] = useState(false);

    const saveLikeTimeOut = useRef(null);

    const handleSendEmotion = (emotionType) => {
        if(bubbleStatus) return;

        clearTimeout(saveLikeTimeOut);

        saveLikeTimeOut.current = setTimeout(() => {
            (
                async () => {
                    if(emotionType === emotionActive) return;
                    await dispatch(updateStoriesLike({
                        id: currStories[currChildStoriesIndex]._id,
                        user,
                        emotionType
                    }))
                }
            )()
        }, 10)

        setBubbleStatus(true);
        setTimeout(()=>{
            setBubbleStatus(false)
        },1990)
    }

    //update when first load && when change emotion
    useEffect(()=>{
        const authLike = currStories[currChildStoriesIndex]?.likeIds.find(item => item.user._id === user._id);
        if(authLike){
            setEmotionActive(authLike.emotionType)
        }
    },[currStories, currChildStoriesIndex])
    return (
        <div className="storie-right-footer__emotion-tool">
            <div className="emotion-tool-list">
                {
                    emotionList.map((emo, index)=>(
                        <div 
                            className="emotion-tool-item"
                            key={index}
                            onClick={()=>handleSendEmotion(emo.type)}
                        >
                            <img src={emo.icon} alt="" />
                            {
                                emo.type === emotionActive ?
                                <span className="emotion-tool-item__active"></span> : null
                            }
                        </div>
                    ))
                }
            </div>
            {
                bubbleStatus &&
                <div className="emotion-tool-bubble">
                    <div className="emotion-tool-bubble__item">
                        <img src={emotionList.find(item => item.type === emotionActive)?.icon} alt="" />
                    </div>
                </div>
            }
        </div>
    );
}

export default EmotionTool;