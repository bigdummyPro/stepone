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
import { getDataAPI } from '../../utils/fetch-data-api';

function MessageRight({handleModal, setEditModalInfo}) {
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
                convType: currConversation.convType,
                text: messInputValue, 
                media: [],
                updatedAt: new Date().toISOString()
            }
            console.log(message)
            const res = await dispatch(createMessage({message, auth: authState, socket: socketState}));
            if(res.data.success){
                setMessInputValue('');
            }
        }
    }
    const handleEditModal = (info) => {
        handleModal(true);
        setEditModalInfo(info);
    }

    useEffect(()=>{
        const newData = messageState.data.find(item => item._id === id);
        if(newData) setData(newData);
        else setData([]);
    },[id, messageState.data])

    useEffect(() => {
        const getMessagesData = async () => {
            if(messageState.data.every(item => item._id !== id)){
                await dispatch(getMessages({id, page: 1}))
            }
        }
        if(currConversation._id) getMessagesData();
    },[id, dispatch, messageState.data, currConversation])

    useEffect(() => {
        const checkUserByID = async () => {
            const res = await getDataAPI(`user/get-user-by-id/${id}`);
            if(res.data.success) setCurrConversation({
                _id: res.data.user._id, 
                convType: 'personal',
                recipients: [{_id: res.data.user._id, username: res.data.user.username, avatar: res.data.user.avatar}]
            })
        }
        if(id && messageState.conversations.length > 0){
            const newConv = messageState.conversations.find(conv => conv._id === id);
            if(newConv) setCurrConversation(newConv);
            else {
                checkUserByID();
            }
        }
    },[id, messageState.conversations])

    useEffect(() => {
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
        if(textareaEl.current){
            textareaEl.current.selectionStart = cursorPosition + 2;
            textareaEl.current.selectionEnd = cursorPosition + 2;
        }
    },[cursorPosition])

    useEffect(()=>{
        if(textareaEl.current) autoResizeHeight();
    },[messInputValue])

    return (
        <>
        {
            messageState.data.length > 0 ?
            <div className="message-right">
                <div className="message-right__top">
                    <div className="message-info">
                        <img src={currConversation && (currConversation.convType === 'personal' ? (currConversation.recipients[0].avatar || UserAvatarImg): (currConversation.convAvatar || GroupAvatarImg)) } alt="" />

                        <span>{currConversation.convType === 'personal' ? currConversation.recipients[0].username : currConversation.convName}</span>
                    </div>
                    {
                        !currConversation.noActiveStatus ?
                        <ul className="message-tool">
                            <li className="message-tool__item">
                                <span>
                                    <i className="fas fa-phone-alt"></i>
                                </span>
                            </li>
                            <li className="message-tool__item">
                                <span>
                                    <i className="fas fa-video"></i>
                                </span>
                            </li>
                            <li className="message-tool__item">
                                <span>
                                    <i className="fas fa-info-circle"></i>
                                </span>
                                <ul className="group-info-menu">
                                    {
                                        currConversation.convType === 'group' ?
                                        <li 
                                            className="group-info-menu__item"
                                            onClick={()=>handleEditModal(currConversation)}
                                        >
                                            <i className="fas fa-user-edit"></i>
                                            Edit group chat
                                        </li> : null
                                    }
                                    <li className="group-info-menu__item">
                                        <i className="fas fa-info-circle"></i>
                                        Information
                                    </li>
                                </ul>
                            </li>
                        </ul> : null
                    }
                </div>
                <div className="message-right__center">
                    <ul className="message-list">
                        {
                            data.messages && data.messages.map((mess, index, array)=>{
                                const duration = new Date(mess.createdAt) - new Date(array[index - 1]?.createdAt);

                                const period = Math.floor((duration / (1000 * 60 * 60)) % 24) * 60 + Math.floor((duration / (1000 * 60)) % 60);
                       
                                return <MessageItem 
                                            key={index}
                                            messageType={mess.sender._id === authState.user._id ? 0 : 1}
                                            message={mess}
                                            wrap={mess.sender._id === array[index - 1]?.sender._id && period <= 20}
                                            period={period}
                                        />
                            })
                        }
                    </ul>
                </div>
                {
                    !currConversation.noActiveStatus ?
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
                    </div> : 
                    <div className="message-right__bottom">
                        <div className="no-active-notification">
                        You are not a member of the conversation, you cannot reply to this conversation
                        </div>
                    </div>
                }
            </div> : 
            <div className="message-right-no-data">
                <div className="no-data-title">
                    No results
                </div>
                <div className="no-data-content">
                    Select a chat or Create new one
                </div>
            </div>
        }
        </>
    );
}

export default MessageRight;