import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import { createComment } from '../../redux/actions/commentAction';

function CommentCreateBox({
    commentFocusStatus, 
    boxType,
    onReply,
    post,
    auth
}) {
    const [inputComment, setInputComment] = useState('');
    const [replyValue, setReplyValue] = useState(null);
    const textareaEl = useRef();
    const dispatch = useDispatch();

    const {emotionModalStatus, emotionValue, emotionChange} = useSelector(state => state.emotionModalReducer);
    const textareaElReducer = useSelector(state => state.emotionModalReducer.textareaEl);
    const authState = useSelector(state => state.authReducer);
    const socketState = useSelector(state => state.socketReducer);

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
    const handleInputComment = (e, inputValue) => {
        if(!e.target.value.match(/\n/)){ //không có chứa kí tự \n (xuống dòng)
            setInputComment(inputValue);
        }
    }
    const handleSubmitWithKey = async (e) => {
        if(e.key === 'Enter' && inputComment !== ''){
            const newComment = {
                content: inputComment,
                likes: [],
                user: authState.user,
                createdAt: new Date().toISOString(),
                reply: onReply.parentCommentId && onReply.parentCommentId,
                tag: onReply.activeComment && onReply.activeComment.user
            }
            console.log(onReply)
            console.log(newComment)
            // const res = await dispatch(createComment({post, newComment, auth: authState, socket: socketState}))

            // if(res.data.success){
            //     setInputComment('');
            // }
        }
    }

    useEffect(()=>{
        const inputTagEl = document.getElementsByClassName('input-tag')[0];
        if(inputTagEl){
            if(replyValue.activeComment.user){
                textareaEl.current.style.textIndent = inputTagEl.offsetWidth + 'px';
                textareaEl.current.placeholder = '';
            }
        }else{
            textareaEl.current.style.textIndent = '0px';
        }
    },[replyValue])

    useEffect(()=>{
        setReplyValue(onReply);
    },[onReply])

    useEffect(()=>{
        if(commentFocusStatus !== null){
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

    return (
        <div className={`comment-box-create ${boxType === 'small' ? 'comment-box-create--small' : ''}`}>
            <div className="comment-box-create__avatar">
                <img src={auth.user.avatar || UserAvatarImg} alt="" />
            </div>
            <div className="comment-box-create__input">
                {
                    replyValue && replyValue.activeComment.user ?
                        <span className="input-tag">
                            {replyValue.activeComment.user.username}
                            <span onClick={()=>setReplyValue({...onReply, activeComment: {}})}>
                                <i className="fas fa-times"></i>
                            </span>
                        </span> : null
                }
                <textarea 
                    ref={textareaEl}
                    name="inputComment" 
                    placeholder="Type your comment..."
                    className="input-text"
                    value={inputComment}
                    onChange={(e)=>handleInputComment(e, e.target.value)}
                    onKeyDown={handleSubmitWithKey}
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