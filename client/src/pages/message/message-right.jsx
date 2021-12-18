import React, { useEffect, useRef, useState } from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import GroupAvatarImg from '../../assets/images/group-avatar.png';
import MessageItem from '../../components/message-item/message-item';
import buildFileSelector from '../../utils/build-file-selector';
import messActionItem from '../../assets/json-data/mess-action-item.json';
import ToolTip from '../../components/tooltip/tooltip';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createMessage, getMessages } from '../../redux/actions/messageAction';

function MessageRight() {
    const [messInputValue, setMessInputValue] = useState('');
    const [messIconTooltip, setMessIconTooltip] = useState(null);
    const [cursorPosition, setCursorPosition] = useState(null);

    const [currConversation, setCurrConversation] = useState({});
    const [data, setData] = useState([]);

    const textareaEl = useRef(null);
    const dispatch = useDispatch();

    const {id} = useParams();

    const {emotionModalStatus, emotionValue, emotionChange} = useSelector(state => state.emotionModalReducer);

    const textareaElReducer = useSelector(state => state.emotionModalReducer.textareaEl);

    const authState = useSelector(state => state.authReducer);

    const socketState = useSelector(state => state.socketReducer);

    const messageState = useSelector(state => state.messageReducer);

    const autoResizeHeight = () => {
        if(textareaEl.current.value !== ''){
            textareaEl.current.style.height = '20px';
            textareaEl.current.style.height = textareaEl.current.scrollHeight + 'px';
        }else{
            textareaEl.current.style.height = '20px'
        }
    }

    const handleChangeTextarea = (e) => {
        if(!e.target.value.match(/\n/)) setMessInputValue(e.target.value);
    }

    const handleFileSelect = (e, acceptType) => {
        e.preventDefault();
        buildFileSelector(acceptType);
    }

    const handleEmotionModal = (toggleIconEl) => {
        dispatch({type: !emotionModalStatus ? GLOBALTYPES.OPEN_EMOTION_MODAL : GLOBALTYPES.CLOSE_EMOTION_MODAL})
        dispatch({type: GLOBALTYPES.SET_TOGGLE_ICON_EL, payload: toggleIconEl})
        dispatch({type: GLOBALTYPES.SET_TEXTAREA_EL, payload: textareaEl})
    }

    const handleSubmitWithKey = async (e) => {
        if(e.key === 'Enter' && messInputValue !== ''){
            const message = {
                _convID: id,
                sender: authState.user,
                recipients: [...currConversation.recipients, {_id: authState.user._id, username: authState.user.username, avatar: authState.user.avatar}],
                // recipients: currConversation.recipients,
                // convName: currConversation.convName,
                // convAvatar: currConversation.convAvatar,
                text: messInputValue, 
                media: [],
                updatedAt: new Date().toISOString()
            }
            const res = await dispatch(createMessage({message, auth: authState, socket: socketState}));
            if(res.data.success){
                setMessInputValue('');
            }
        }
    }

    useEffect(()=>{console.log('check01')
        const newData = messageState.data.find(item => item._id === id);
        console.log(newData)
        if(newData) setData(newData);
        else setData([]);
    },[id, messageState.data])

    useEffect(() => {console.log('check02')
        const getMessagesData = async () => {
            if(messageState.data.every(item => item._id !== id)){
                await dispatch(getMessages({id, page: 1}))
            }
        }
        getMessagesData();
    },[id, dispatch, messageState.data])

    useEffect(() => {console.log('check03')
        if(id && messageState.conversations.length > 0){
            const newConv = messageState.conversations.find(conv => conv._id === id);
            if(newConv) setCurrConversation(newConv);
        }
    },[id, messageState.conversations])

    useEffect(() => {console.log('check04')
        if(messageState.userStorage){
            setCurrConversation(messageState.userStorage)
        }
    },[messageState.userStorage])

    useEffect(()=>{
        if(textareaEl === textareaElReducer){
            const cursorPos = textareaEl.current.value.slice(0, textareaEl.current.selectionStart).length;
            setCursorPosition(cursorPos);
    
            let newPostText = '';
            newPostText = messInputValue.substring(0, cursorPos) + emotionValue + messInputValue.substring(cursorPos, messInputValue.length);
            //Prevent other post set state when state in reducer change
            setMessInputValue(newPostText);
        }
    },[emotionChange])

    useEffect(()=>{
        textareaEl.current.selectionStart = cursorPosition + 2
        textareaEl.current.selectionEnd = cursorPosition + 2
    },[cursorPosition])

    useEffect(()=>{
        autoResizeHeight();
    },[messInputValue])
    console.log(data.messages)
    console.log(messageState)
    return (
        <div className="message-right">
            <div className="message-right__top">
                <div className="message-info">
                    <img src={currConversation && (currConversation.convType === 'personal' ? (currConversation.recipients[0].avatar || UserAvatarImg): (currConversation.convAvatar || GroupAvatarImg)) } alt="" />

                    <span>{currConversation.convType === 'personal' ? currConversation.recipients[0].username : currConversation.convName}</span>
                </div>
                <ul className="message-tool">
                    <li className="message-tool__item">
                        <i className="fas fa-phone-alt"></i>
                    </li>
                    <li className="message-tool__item">
                        <i className="fas fa-video"></i>
                    </li>
                    <li className="message-tool__item">
                        <i className="fas fa-info-circle"></i>
                    </li>
                </ul>
            </div>
            <div className="message-right__center">
                <ul className="message-list">
                    {
                        data.messages && data.messages.map((mess, index)=>(
                            <MessageItem 
                                key={index}
                                messageType={mess.sender._id === authState.user._id ? 0 : 1}
                                message={mess}
                            />
                        ))
                    }
                </ul>
            </div>
            <div className="message-right__bottom">
                <ul className="message-action">
                    {
                        messActionItem.map((meAcIt, index)=>(
                            <li 
                                key={index}
                                className="message-action__item"
                                onClick={(e)=>handleFileSelect(e, meAcIt.acceptType)}
                                onMouseOver={()=>setMessIconTooltip(index)}
                                onMouseOut={()=>setMessIconTooltip(null)}
                            >
                                <i className={meAcIt.icon}></i>
                                <ToolTip 
                                    content={meAcIt.tooltipContent}
                                    status={messIconTooltip === index ? true : false } 
                                    colorClass='--third-color'
                                />
                            </li>
                        ))
                    }
                </ul>
                <div className="message-input">
                    <div className="message-input__wrapper">
                        <textarea 
                            ref={textareaEl}
                            name="" 
                            value={messInputValue}
                            placeholder="Enter your message"
                            onChange={handleChangeTextarea}
                            onKeyDown={handleSubmitWithKey}
                        ></textarea>
                        <span 
                            id="emotion-toggle-icon"
                            onClick={(e)=>handleEmotionModal(e.target.parentNode)}
                        >
                            <i className="fas fa-grin-stars"></i>
                        </span>
                    </div>
                </div>
                <div className="message-icon">
                    <i className="fas fa-heart"></i>
                </div>
            </div>
        </div>
    );
}

export default MessageRight;