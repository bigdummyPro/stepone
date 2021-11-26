import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import GirlImg from '../../assets/images/girl.png';

function CommentCreateBox({
    commentFocusStatus, 
    boxType,
    hashtagLv2,
    hashtagLv3
}) {
    const [inputComment, setInputComment] = useState('');
    const textareaEl = useRef();
    const dispatch = useDispatch();

    const {emotionModalStatus, emotionValue, emotionChange} = useSelector(state => state.emotionModalReducer);
    const textareaElReducer = useSelector(state => state.emotionModalReducer.textareaEl);

    const [cursorPosition, setCursorPosition] = useState(null);

    const autoResizeHeight = () => {
        if(textareaEl.current.value !== ''){
            textareaEl.current.style.height = '20px';
            textareaEl.current.style.height = textareaEl.current.scrollHeight + 'px';
        }else{
            textareaEl.current.style.height = '20px'
        }
    }
    const handleEmotionModal = (toggleIconEl) => {
        dispatch({type: !emotionModalStatus ? GLOBALTYPES.OPEN_EMOTION_MODAL : GLOBALTYPES.CLOSE_EMOTION_MODAL})
        dispatch({type: GLOBALTYPES.SET_TOGGLE_ICON_EL, payload: toggleIconEl})
        dispatch({type: GLOBALTYPES.SET_TEXTAREA_EL, payload: textareaEl})
    }
    const handleInputComment = (inputValue) => {
        setInputComment(inputValue);
    }

    useEffect(()=>{
        if(commentFocusStatus !== null){console.log('vvt')
            textareaEl.current.focus();
        }
    },[commentFocusStatus])
    useEffect(()=>{
        autoResizeHeight();
    },[inputComment])

    useEffect(()=>{
        if(textareaEl === textareaElReducer){
            const cursorPos = textareaEl.current.value.slice(0, textareaEl.current.selectionStart).length;
            setCursorPosition(cursorPos);
    
            let newPostText = '';
            newPostText = inputComment.substring(0, cursorPos) + emotionValue + inputComment.substring(cursorPos, inputComment.length);
            //Prevent other post set state when state in reducer change
            setInputComment(newPostText);
        }
    },[emotionChange])
    useEffect(()=>{
        if(cursorPosition !== null && textareaEl){
            textareaEl.current.selectionStart = cursorPosition + 2
            textareaEl.current.selectionEnd = cursorPosition + 2
        }
    },[cursorPosition])

    useEffect(()=>{
        if(hashtagLv2 && hashtagLv2.content !== ''){
            textareaEl.current.focus();
            setInputComment(hashtagLv2.content);
        }
    },[hashtagLv2])
    useEffect(()=>{
        if(hashtagLv3 && hashtagLv3.content !== ''){
            textareaEl.current.focus();
            setInputComment(hashtagLv3.content);
        }
    },[hashtagLv3])
    return (
        <div className={`comment-box-create ${boxType === 'small' ? 'comment-box-create--small' : ''}`}>
            <div className="comment-box-create__avatar">
                <img src={GirlImg} alt="" />
            </div>
            <div className="comment-box-create__input">
                <textarea 
                    ref={textareaEl}
                    name="inputComment" 
                    placeholder="Type your comment..."
                    className="input-text"
                    value={inputComment}
                    onChange={(e)=>handleInputComment(e.target.value)}
                ></textarea>
                <ul className="input-tool">
                    <li 
                        className="input-tool-item"
                        id="comment-toggle-icon"
                        onClick={(e)=>handleEmotionModal(e.target.parentNode.parentNode)}
                    >
                        <span><i className="fas fa-grin-stars"></i></span>
                    </li>
                    <li className="input-tool-item">
                        <span><i className="fas fa-camera"></i></span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default CommentCreateBox;