import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import './emotion-modal.scss';

function EmotionModal() {
    const emotions = [   
        '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
        '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
        '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
    ]

    const dropdown_content_el = useRef(null);


    const [emotionModalPosition, setEmotionModalPosition] = useState({x: 0, y: 0});

    const {
        emotionModalStatus, 
        emotionChange, 
        toggleIconEl
    } = useSelector(state => state.emotionModalReducer);

    const dispatch = useDispatch();

    const addEmotionToTextPost = (emotion) => {
        dispatch({type: GLOBALTYPES.SET_EMOTION_VALUE, payload: emotion});
        dispatch({type: GLOBALTYPES.SET_EMOTION_CHANGE, payload: !emotionChange})
    }

    useEffect(()=>{
        const wrapRect = document.body.getBoundingClientRect();
        
        if(toggleIconEl){
            const toggleElement = toggleIconEl;
            const rect = toggleElement.getBoundingClientRect();
            setEmotionModalPosition({x: rect.left - wrapRect.left, y: rect.top - wrapRect.top});
        }
    },[emotionModalStatus])

    useEffect(() => {
        function toggleModal(e){
            const dropdown_toggle_el = toggleIconEl;
                if(dropdown_content_el.current && !dropdown_content_el.current.contains(e.target) && !dropdown_toggle_el.contains(e.target)){
                    dispatch({type: GLOBALTYPES.CLOSE_EMOTION_MODAL})
                }
        }
        function closeModalOnScroll(){
            if(toggleModal){
                dispatch({type: GLOBALTYPES.CLOSE_EMOTION_MODAL})
            }
        }
        if(toggleIconEl){
            document.addEventListener('mousedown', toggleModal);
            window.addEventListener('scroll', closeModalOnScroll);
        }
        return () => {
            document.removeEventListener('mousedown', toggleModal);
            window.removeEventListener('scroll', closeModalOnScroll);
        }
    },[toggleIconEl])

    return (
        <div className="emotion-modal">
            <div 
                className={`emotion-modal__content ${emotionModalStatus ? '--active' : ''}`} 
                ref={dropdown_content_el}
                style={{left: `${emotionModalPosition.x + 2}px`, top: `${emotionModalPosition.y - 10}px`}}
            >
                <div className="emotion-modal-list">
                    {
                        emotions.map((emotion, index) => (
                            <span 
                                key={index}
                                className="emotion-modal-item"
                                onClick={()=>addEmotionToTextPost(emotion)}
                            >
                                {emotion}
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default EmotionModal;