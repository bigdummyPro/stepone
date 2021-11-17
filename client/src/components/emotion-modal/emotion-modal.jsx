import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
// import clickOutsideRef from '../../utils/dropdown-event';
import './emotion-modal.scss';

function EmotionModal({
    emotionModalStatus, 
    emotionModalPosition, 
    closeEmotionModal,
    addEmotion
}) {
    const emotions = [   
        '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
        '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
        '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
    ]

    const dropdown_content_el = useRef(null);
    // const dropdown_toggle_el = useRef(null);

    // clickOutsideRef(dropdown_content_el, dropdown_toggle_el);
    // const emotionModalStatus = useSelector(state => state.modalReducer.emotionModalInCreatePost);
    // const emotionModalPosition = useSelector(state => state.modalReducer.emotionModalPosition);

    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            const dropdown_toggle_el = document.getElementById('emotion-toggle-icon');
            if(dropdown_content_el.current && !dropdown_content_el.current.contains(e.target) && !dropdown_toggle_el.contains(e.target)){
                // dispatch({type: GLOBALTYPES.EMOTION_MODAL_IN_CREATE_POST, payload: false})
                closeEmotionModal()
            }
        })
    },[])

    return (
        <div className="emotion-modal">
            {/* <span className="emotion-modal__icon" ref={dropdown_toggle_el}>
                <i className="far fa-grin-alt"></i>
            </span> */}
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
                                onClick={()=>addEmotion(emotion)}
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