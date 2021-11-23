import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GirlImg from '../../assets/images/girl.png';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';

function PostCommentBox({commentFocusStatus}) {
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
        // console.log(textareaEl.current.selectionStart, textareaEl.current.selectionEnd)
    },[cursorPosition])
    return (
        <div className="post-item__comment-box">
            <div className="comment-box-list">
                <div className="comment-box-item comment-box-lv1-list">
                    <div className="comment-box-line"></div>
                    <div className="comment-box-item--style comment-box-item__lv1">
                        <a href="#vv" className="comment-box-avatar">
                            <img src={GirlImg} alt="" />
                        </a>
                        <div className="comment-box-body">
                            <div className="comment-box-body__content">
                                <span className="comment-content-name">
                                    Nguyễn Hoàng Khánh Ngân
                                </span>
                                <span className="comment-content-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis, porro quaerat, exercitationem dolorem id voluptate accusamus nostrum atque facere necessitatibus dolor qui. Itaque, labore iusto.
                                </span>
                            </div>
                            <div className="comment-box-body__tool">
                                <span className="comment-tool comment-tool-like">
                                    Like
                                </span>
                                <span className="comment-tool comment-tool-reply">
                                    Reply
                                </span>
                                <span className="comment-tool comment-tool-time">
                                    3 hours ago
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="comment-box-item comment-box-item__child comment-box-lv2-list">
                        <div className="comment-box-lv2-item">
                            <div className="comment-box-curve"></div>
                            <div className="comment-box-line"></div>
                            <div className="comment-box-item--style comment-box-item__lv2">
                                <div className="comment-box-curve"></div>
                                <a href="#vv" className="comment-box-avatar">
                                    <img src={GirlImg} alt="" />
                                </a>
                                <div className="comment-box-body">
                                    <div className="comment-box-body__content">
                                        <span className="comment-content-name">
                                            Nguyễn Hoàng Khánh Ngân
                                        </span>
                                        <span className="comment-content-text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis.
                                        </span>
                                    </div>
                                    <div className="comment-box-body__tool">
                                        <span className="comment-tool comment-tool-like">
                                            Like
                                        </span>
                                        <span className="comment-tool comment-tool-reply">
                                            Reply
                                        </span>
                                        <span className="comment-tool comment-tool-time">
                                            3 hours ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-box-item comment-box-item__child comment-box-lv3-list">
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-curve"></div>
                                    <div className="comment-box-item--style comment-box-item__lv3">
                                        <div className="comment-box-curve"></div>
                                        <a href="#vv" className="comment-box-avatar">
                                            <img src={GirlImg} alt="" />
                                        </a>
                                        <div className="comment-box-body">
                                            <div className="comment-box-body__content">
                                                <span className="comment-content-name">
                                                    Nguyễn Hoàng Khánh Ngân
                                                </span>
                                                <span className="comment-content-text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis.
                                                </span>
                                            </div>
                                            <div className="comment-box-body__tool">
                                                <span className="comment-tool comment-tool-like">
                                                    Like
                                                </span>
                                                <span className="comment-tool comment-tool-reply">
                                                    Reply
                                                </span>
                                                <span className="comment-tool comment-tool-time">
                                                    3 hours ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-curve"></div>
                                    <div className="comment-box-item--style comment-box-item__lv3">
                                        <div className="comment-box-curve"></div>
                                        <a href="#vv" className="comment-box-avatar">
                                            <img src={GirlImg} alt="" />
                                        </a>
                                        <div className="comment-box-body">
                                            <div className="comment-box-body__content">
                                                <span className="comment-content-name">
                                                    Nguyễn Hoàng Khánh Ngân
                                                </span>
                                                <span className="comment-content-text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis, porro quaerat, exercitationem dolorem id voluptate accusamus nostrum atque facere necessitatibus dolor qui. Itaque, labore iusto.
                                                </span>
                                            </div>
                                            <div className="comment-box-body__tool">
                                                <span className="comment-tool comment-tool-like">
                                                    Like
                                                </span>
                                                <span className="comment-tool comment-tool-reply">
                                                    Reply
                                                </span>
                                                <span className="comment-tool comment-tool-time">
                                                    3 hours ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comment-box-lv2-item">
                            <div className="comment-box-curve"></div>
                            <div className="comment-box-line"></div>
                            <div className="comment-box-item--style comment-box-item__lv2">
                                <div className="comment-box-curve"></div>
                                <a href="#vv" className="comment-box-avatar">
                                    <img src={GirlImg} alt="" />
                                </a>
                                <div className="comment-box-body">
                                    <div className="comment-box-body__content">
                                        <span className="comment-content-name">
                                            Nguyễn Hoàng Khánh Ngân
                                        </span>
                                        <span className="comment-content-text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </span>
                                    </div>
                                    <div className="comment-box-body__tool">
                                        <span className="comment-tool comment-tool-like">
                                            Like
                                        </span>
                                        <span className="comment-tool comment-tool-reply">
                                            Reply
                                        </span>
                                        <span className="comment-tool comment-tool-time">
                                            3 hours ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-box-item comment-box-item__child comment-box-lv3-list">
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-curve"></div>
                                    <div className="comment-box-item--style comment-box-item__lv3">
                                        <div className="comment-box-curve"></div>
                                        <a href="#vv" className="comment-box-avatar">
                                            <img src={GirlImg} alt="" />
                                        </a>
                                        <div className="comment-box-body">
                                            <div className="comment-box-body__content">
                                                <span className="comment-content-name">
                                                    Nguyễn Hoàng Khánh Ngân
                                                </span>
                                                <span className="comment-content-text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis, porro quaerat, exercitationem dolorem id.
                                                </span>
                                            </div>
                                            <div className="comment-box-body__tool">
                                                <span className="comment-tool comment-tool-like">
                                                    Like
                                                </span>
                                                <span className="comment-tool comment-tool-reply">
                                                    Reply
                                                </span>
                                                <span className="comment-tool comment-tool-time">
                                                    3 hours ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment-box-item">
                    <div className="comment-box-item--style">
                        <div className="comment-box-avatar">
                            <img src={GirlImg} alt="" />
                        </div>
                        <div className="comment-box-body">
                            <div className="comment-box-body__content">
                                <span className="comment-content-name">
                                    Nguyễn Hoàng Khánh Ngân
                                </span>
                                <span className="comment-content-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis, porro quaerat, exercitationem dolorem id voluptate accusamus nostrum atque facere necessitatibus dolor qui. Itaque, labore iusto.
                                </span>
                            </div>
                            <div className="comment-box-body__tool">
                                <span className="comment-tool comment-tool-like">
                                    Like
                                </span>
                                <span className="comment-tool comment-tool-reply">
                                    Reply
                                </span>
                                <span className="comment-tool comment-tool-time">
                                    3 hours ago
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comment-box-create">
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
        </div>
    );
}

export default PostCommentBox;