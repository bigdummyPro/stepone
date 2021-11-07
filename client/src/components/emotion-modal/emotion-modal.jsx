import React, { useRef } from 'react';
import clickOutsideRef from '../../utils/dropdown-event';
import './emotion-modal.scss';

function EmotionModal(props) {
    const emotions = [   
        '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
        '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
        '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
    ]

    const dropdown_content_el = useRef(null);
    const dropdown_toggle_el = useRef(null);

    clickOutsideRef(dropdown_content_el, dropdown_toggle_el);

    return (
        <div className="emotion-modal">
            <span className="emotion-modal__icon" ref={dropdown_toggle_el}>
                <i className="far fa-grin-alt"></i>
            </span>
            <div className="emotion-modal__content" ref={dropdown_content_el}>
                <div className="emotion-modal-list">
                    {
                        emotions.map((emotion, index) => (
                            <span 
                                key={index}
                                className="emotion-modal-item"
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