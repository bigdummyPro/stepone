import React, { useEffect, useRef, useState } from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import GroupAvatarImg from '../../assets/images/group-avatar.png';
import LoadingImg from '../../assets/images/loading.gif';
import MessageItem from '../../components/message-item/message-item';
import buildFileSelector from '../../utils/build-file-selector';
import messActionItem from '../../assets/json-data/mess-action-item.json';
import ToolTip from '../../components/tooltip/tooltip';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createMessage, getMessages, loadMoreMessages } from '../../redux/actions/messageAction';
import { getDataAPI } from '../../utils/fetch-data-api';
import {imageUpload} from '../../utils/image-upload';

function MessageRight({handleModal, setEditModalInfo}) {
    const [messInputValue, setMessInputValue] = useState('');
    const [messIconTooltip, setMessIconTooltip] = useState(null);
    const [cursorPosition, setCursorPosition] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);

    const [currConversation, setCurrConversation] = useState({});
    const [data, setData] = useState(null);
    const [media, setMedia] = useState([]);
    const [messageLoading, setMessageLoading] = useState(false);

    const [isLoadMore, setIsLoadMore] = useState(1);
    const [result, setResult] = useState(0);
    const [page, setPage] = useState(0);

    const textareaEl = useRef(null);
    const messListRef = useRef(null);
    const messEndRef = useRef();

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
            if(textareaEl.current.scrollHeight > 150){
                textareaEl.current.style.height = '150px';
                textareaEl.current.style.overflowY = 'auto';
            }else{
                textareaEl.current.style.height = textareaEl.current.scrollHeight + 'px';
                textareaEl.current.style.overflowY = 'hidden';
            }
        }else{
            textareaEl.current.style.height = '20px'
        }
    }

    const handleChangeTextarea = (e) => {
        if(!e.target.value.match(/\n/)) setMessInputValue(e.target.value);
    }

    const handleFileSelect = async (e, acceptType) => {
        e.preventDefault();
        const fileSelector = await buildFileSelector(acceptType);
        let files = [];
        fileSelector.onchange = function(e){
            files = [...e.target.files]
            handleChangeMedia(files)
        }
    }

    const handleChangeMedia = (files) => {
        let err = ""
        let newMedia = [];
        files.forEach(file => {
            if(!file) return err = "File does not exist."
            console.log(file)
            // if(file.type === 'video/mp4') return err = "Video is not excepted."
            if(file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/gif') return err = "File format is not excepted"

            if(file.size > 1024 * 1024 * 5){
                return err = "The image largest is 5mb."
            }
            return newMedia.push(file)
        })
        if(!err) setMedia([...media, ...newMedia])
    }
    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }
    const handleEmotionModal = (toggleIconEl) => {
        dispatch({type: !emotionModalStatus ? GLOBALTYPES.OPEN_EMOTION_MODAL : GLOBALTYPES.CLOSE_EMOTION_MODAL})
        dispatch({type: GLOBALTYPES.SET_TOGGLE_ICON_EL, payload: toggleIconEl})
        dispatch({type: GLOBALTYPES.SET_TEXTAREA_EL, payload: textareaEl})
    }

    const handleSendEmotion = async () => {
        const message = {
            _convID: id,
            sender: authState.user,
            recipients: [...currConversation.recipients, {_id: authState.user._id, username: authState.user.username, avatar: authState.user.avatar}],
            convType: currConversation.convType,
            text: '❤️', 
            media: [],
            updatedAt: new Date().toISOString()
        }
        await dispatch(createMessage({message, auth: authState, socket: socketState}));
        messListRef.current.scrollIntoView({behavior: 'smooth', block: 'end'})
    }
    const handleSubmitWithBtn = async () => {
        if(messageLoading) return;

        if(messInputValue.trim() !== '' || media.length > 0){
            setMessageLoading(true);
            setMessInputValue('');
            setMedia([]);

            let newMediaArr = [];
            if(media.length > 0) newMediaArr = await imageUpload(media);

            const message = {
                _convID: id,
                sender: authState.user,
                recipients: [...currConversation.recipients, {_id: authState.user._id, username: authState.user.username, avatar: authState.user.avatar}],
                convType: currConversation.convType,
                text: messInputValue, 
                media: newMediaArr,
                updatedAt: new Date().toISOString()
            }

            const res = await dispatch(createMessage({message, auth: authState, socket: socketState}));
            if(res.data.success){
                setMessageLoading(false);
                messListRef.current.scrollIntoView({behavior: 'smooth', block: 'end'})
            }
        }
    }
    const handleSubmitWithKey = async (e) => {
        if(messageLoading) return;

        if(e.key === 'Enter' && (messInputValue !== '' || media.length > 0)){

            setMessInputValue('');
            setMedia([]);
            setMessageLoading(true);

            let newMediaArr = [];
            if(media.length > 0) newMediaArr = await imageUpload(media);

            const message = {
                _convID: id,
                sender: authState.user,
                recipients: [...currConversation.recipients, {_id: authState.user._id, username: authState.user.username, avatar: authState.user.avatar}],
                convType: currConversation.convType,
                text: messInputValue, 
                media: newMediaArr,
                updatedAt: new Date().toISOString()
            }

            const res = await dispatch(createMessage({message, auth: authState, socket: socketState}));

            if(res.data.success){
                setMessageLoading(false);
                messListRef.current.scrollIntoView({behavior: 'smooth', block: 'end'})
            }
        }
    }
    const handleEditModal = (info) => {
        handleModal(true);
        setEditModalInfo(info);
    }
    useEffect(()=>{
        const newData = messageState.data.find(item => item._id === id);
        if(newData) {
            setData(newData);
            setResult(newData.result);
            setPage(newData.page);
        }
        else setData([]);
    },[id, messageState.data])

    const vv = useRef();
     // Load More
     useEffect(() => {
        if(!messEndRef.current) return;
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                console.log('visible')
                console.log(messEndRef.current.parentNode.offsetHeight)
                setIsLoadMore(p => p + 1)
                vv.current = messEndRef.current.parentNode.scrollHeight
            }
        },{
            threshold: 0.1
        })

        observer.observe(messEndRef.current)
    },[setIsLoadMore, messEndRef.current])

    useEffect(() => {
        if(isLoadMore > 1){
            if(result >= page * 10){
                dispatch(loadMoreMessages({id, page: page + 1}))
                setIsLoadMore(1)
                console.log(vv.current)
                console.log(messEndRef.current.parentNode)
                messEndRef.current.parentNode.parentNode.scrollTo(0, vv.current)
            }
        }
        // eslint-disable-next-line
    },[isLoadMore])

    const [waitingStatus, setWaitingStatus] = useState(false);

    useEffect(() => {
        const getMessagesData = async () => {
            if(waitingStatus) return;
            if(!id) return;

            if(messageState.data.every(item => item._id !== id)){
                setWaitingStatus(true);

                const res = await dispatch(getMessages({id, page: 0}));

                if(res.data.success){
                    setWaitingStatus(false);
                }

                if(messListRef.current)
                setTimeout(()=>{
                    messListRef.current.scrollIntoView({behavior: 'smooth', block: 'end'})
                }, 50)
            }
        }
        if(currConversation._id) getMessagesData();
    },[id, messageState.data, currConversation, waitingStatus])

    useEffect(() => {
        const checkUserByID = async () => {
            const res = await getDataAPI(`user/get-user-by-id/${id}`);
            if(res.data.success) { 
                setCurrConversation({
                    _id: res.data.user._id, 
                    convType: 'personal',
                    recipients: [{_id: res.data.user._id, username: res.data.user.username, avatar: res.data.user.avatar}]
                })
            }else{
                setFirstLoad(false)
            }
        }
        if(id){
            const newConv = messageState.conversations.find(conv => conv._id === id);
            if(newConv) {
                setCurrConversation(newConv); 
                setFirstLoad(false);
            }
            else {
                if(id !== currConversation._id) checkUserByID();
                setData([]);
            }
        }
        if(!id && messageState.conversations.length <= 0){
            setFirstLoad(false)
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
            data ?
                messageState.data.length > 0 || currConversation._id || firstLoad ?
                <div className="message-right">
                    {
                        currConversation._id ?
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
                        </div> : null
                    }
                    {
                        messageState.data.length > 0 ?
                        <div className="message-right__center">
                            <ul className="message-list" ref={messListRef}>
                                <li 
                                    className="message-load-more"
                                    ref={messEndRef}
                                >Load more</li>
                                {
                                    data.messages && data.messages.map((mess, index, array)=>{
                                        const duration = new Date(mess.createdAt) - new Date(array[index - 1]?.createdAt);

                                        const period = Math.floor((duration / (1000 * 60 * 60)) % 24) * 60 + Math.floor((duration / (1000 * 60)) % 60);
                            
                                        return <MessageItem 
                                                    key={index}
                                                    messageType={mess.sender._id === authState.user._id ? 0 : 1}
                                                    message={mess}
                                                    wrap={mess.sender._id === array[index - 1]?.sender._id && period <= 50}
                                                    period={period}
                                                    user={authState.user}
                                                />
                                    })
                                }
                                {
                                    messageLoading ?
                                    <li className="message-item message-item--reverse">
                                        <div className="message-item-loading">
                                            <img src={LoadingImg} alt="" />
                                        </div>
                                    </li> : null
                                }
                                {   //&& data.messages && data.messages.slice(-1)[0].sender._id !== authState.user._id 
                                    currConversation.isRead && currConversation.isRead.filter(item => item._id !== authState.user._id).length > 0 ?
                                    <li className="message-seen-list">
                                        {
                                            currConversation.isRead.map((item, index) => (
                                                item._id !== authState.user._id ?
                                                <div 
                                                    className="message-seen-item"
                                                    key={index}
                                                >
                                                    <img src={item.avatar ||UserAvatarImg} alt="" />
                                                    <span className="message-seen-item__name">
                                                        {item.username}
                                                    </span>
                                                </div> : null
                                            ))
                                        }
                                    </li>
                                    : null
                                }
                            </ul>
                        </div> : 
                        <div className="message-right__center"></div>
                    }
                    {
                        currConversation._id ?
                        !currConversation.noActiveStatus ?
                        <div className="message-right__bottom">
                            {
                                media.length > 0 ?
                                <div className="message-media-content">
                                    <ul className="media-content-list">
                                        {
                                            media.map((me, index) => (
                                                <li 
                                                    className="media-content-item"
                                                    key={index}
                                                >
                                                    <img src={URL.createObjectURL(me)} alt="" />
                                                    <span 
                                                        className="media-remove"
                                                        onClick={()=>handleDeleteMedia(index)}
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div> : null
                            }
                            <div className="message-text-content">
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
                                {
                                    messInputValue === '' && media.length <= 0 ?
                                    <div 
                                        className="message-icon"
                                        onClick={handleSendEmotion}
                                    >
                                        <i className="fas fa-heart"></i>
                                    </div> :
                                    <div 
                                        className="message-icon"
                                        style={{transform: 'rotate(45deg)'}}
                                        onClick={handleSubmitWithBtn}
                                    >
                                        <i className="fas fa-paper-plane"></i>
                                    </div>
                                }
                            </div>
                        </div> : 
                        <div className="message-right__bottom">
                            <div className="no-active-notification">
                            You are not a member of the conversation, you cannot reply to this conversation
                            </div>
                        </div> : null
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
            : 
            <div className="message-right-loading">
                <img src={LoadingImg} alt="" />
            </div>
        }
        </>
    );
}

export default MessageRight;