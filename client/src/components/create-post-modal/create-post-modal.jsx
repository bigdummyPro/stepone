import React, { useEffect, useRef, useState } from 'react';
import './create-post-modal.scss';
import EmotionModal from '../emotion-modal/emotion-modal';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import CreateFileModal from '../create-file-modal/create-file-modal';
import ToolTip from '../tooltip/tooltip';
import moreRightItems from '../../assets/json-data/more-right-item.json';

function CreatePostModal(props) {

    // const [fileModalStatus, setFileModaStatus] = useState(false);
    const [emotionModalStatus, setEmotionModalStatus] = useState(false);
    const [emotionModalPosition, setEmotionModalPosition] = useState({x: 0, y: 0});
    const [postText, setPostText] = useState('');
    const [cursorPosition, setCursorPosition] = useState(null);
    const [moreItemActive, setMoreItemActive] = useState(null);
    const [moreItemTooltip, setMoreIemTooltip] = useState(null);
    const [fileModalType, setFileModalType] = useState(null);

    const textareaEl = useRef(null);

    const dispatch = useDispatch();
    // const emotionModalStatus = useSelector(state => state.modalReducer.emotionModalInCreatePost);
    const fileModalStatus = useSelector(state => state.modalReducer.fileModalInCreatePost);
    const initFileModalType = useSelector(state => state.modalReducer.initFileModalType);

    const closeModal = () => {
        dispatch({type: GLOBALTYPES.CREATE_POST_MODAL_STATUS, payload: false});
    }
    const toggleFileModal = (status) => {
        // setMoreItemActive(index);
        dispatch({type: GLOBALTYPES.FILE_MODAL_IN_CREATE_POST, payload: status});
    }
    const closeEmotionModalOnScroll = () => {
        if(emotionModalStatus !== false){
            // dispatch({type: GLOBALTYPES.EMOTION_MODAL_IN_CREATE_POST, payload: false})
            setEmotionModalStatus(false)
        }
    }
    const toggleEmotionModal = () => {
        // dispatch({type: GLOBALTYPES.EMOTION_MODAL_IN_CREATE_POST, payload: !emotionModalStatus})
        setEmotionModalStatus(!emotionModalStatus);
        const toggleElement = document.getElementById('emotion-toggle-icon');
        const rect = toggleElement.getBoundingClientRect();
        // dispatch({type: GLOBALTYPES.EMOTION_MODAL_POSITION, payload: {x: rect.left, y: rect.top}})
        setEmotionModalPosition({x: rect.left, y: rect.top});
    }
    const autoResizeHeight = (e) => {
        if(e.target.value !== ''){
            e.target.style.height = 'auto';
            e.target.style.height = (e.target.scrollHeight - 2) + 'px';
        }else{
            e.target.style.height = '130px'
        }
    }
    const handleChangeInput = (e) => {
        setPostText(e.target.value);
    }
    const addEmotionToTextPost = (emotion) => {
        const cursorPos = textareaEl.current.value.slice(0, textareaEl.current.selectionStart).length;
        
        setCursorPosition(cursorPos);

        let newPostText = '';console.log(cursorPosition)

        newPostText = postText.substring(0, cursorPos) + emotion + postText.substring(cursorPos, postText.length);

        setPostText(newPostText);
    }
    const actionInMoreRightItem = (index) => {
        setMoreItemActive(index);
        if(index === 0) {
            setFileModalType(0);
            toggleFileModal(true);
        }else if(index === 1){
            setFileModalType(1);
            toggleFileModal(true);
        }else if(index === 2){
            toggleFileModal(false)
        }
    }
    useEffect(()=>{
        textareaEl.current.selectionStart = cursorPosition + 2
        textareaEl.current.selectionEnd = cursorPosition + 2
    },[cursorPosition])

    useEffect(()=>{
        initFileModalType !== null && setFileModalType(initFileModalType);
    },[initFileModalType])
    return (
        <div className="create-modal-wrapper">
            <div className="create-modal">
                <div className="create-modal__top">
                    <span className="modal-top-title">Create Post</span>
                    <span 
                        className="modal-top-close"
                        onClick={closeModal}
                    >
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="create-modal__center">
                    <div className="modal-center-content" onScroll={closeEmotionModalOnScroll}>
                        <div className="modal-center-text">
                            <textarea 
                                id="post-text"
                                value={postText}
                                name="" 
                                placeholder="What do you think?"
                                onInput={autoResizeHeight}
                                onChange={handleChangeInput}
                                ref={textareaEl}
                            >

                            </textarea>
                        </div>
                        <div className="modal-center-icon">
                            <span id="emotion-toggle-icon" onClick={toggleEmotionModal}>
                                <i className="far fa-grin-alt"></i>
                            </span>
                        </div>
                        {
                            fileModalStatus ?
                                <div className="modal-center-file">
                                    <CreateFileModal 
                                        // onClose={()=>setFileModaStatus(false)}
                                        onClose={()=>toggleFileModal(false)}
                                        fileModalType={fileModalType}
                                    />
                                </div> : null
                        }
                    </div>
                    <EmotionModal 
                        emotionModalStatus={emotionModalStatus}
                        emotionModalPosition={emotionModalPosition}
                        closeEmotionModal={()=>setEmotionModalStatus(false)}
                        addEmotion={(emotion)=>addEmotionToTextPost(emotion)}
                    />
                    <div className="modal-center-more">
                        <span className="modal-center-more__left">
                            Add to post
                        </span>
                        <div className="modal-center-more__right">
                            {
                                moreRightItems.map((moRiIt, index)=>(
                                    <div 
                                        key={index}
                                        className={`more-right-item ${moRiIt.classColor} ${moreItemActive === index ? '--active' : ''}`}
                                        onClick={()=>actionInMoreRightItem(index)}
                                        onMouseOver={()=>setMoreIemTooltip(index)}
                                        onMouseOut={()=>setMoreIemTooltip(null)}
                                    >
                                        <span>
                                            <i className={moRiIt.icon}></i>
                                        </span>
                                        <ToolTip 
                                            content={moRiIt.tooltipContent}
                                            status={moreItemTooltip === index ? true : false } 
                                            colorClass='--first-color'
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="create-modal__bottom">
                    <button className="btn btn--primary btn--radius-5px">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;