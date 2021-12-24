import React from 'react';
import './message-item.scss';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import MessageContentTool from './message-content-tool';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';


function MessageItem({messageType, message, wrap, period}) {
    const dispatch = useDispatch();

    const handleMediaDetail = (media) => {
        dispatch({type: GLOBALTYPES.MEDIA_DETAIL_MODAL, payload: {
            status: true,
            data: media
        }})
    }
    return (
        <>
            {
               messageType === 0 ?
               <li className="message-item message-item--reverse">
                    <div className="message-item-wrapper">
                        <div className="message-item__content">
                            <div className="message-content-text">
                                {
                                    messageType !== 0 ?
                                        <div className="text-name">
                                            {message.sender.username.split(' ')[message.sender.username.split(' ').length - 1]}
                                        </div> : null
                                }
                                <div className="text-content">
                                    {message.text}
                                </div>
                                {
                                    message.media.length > 0 ?
                                    <div className="media-content">
                                        {
                                            message.media.map((me, index)=>(
                                            <div 
                                            className="media-content-item"
                                            key={index}
                                            onClick={()=>handleMediaDetail(me)}
                                            >
                                                <img src={me.url} alt="" />
                                            </div>
                                            ))
                                        }
                                    </div> : null
                                }
                            </div>
                            <MessageContentTool updatedAt={message.updatedAt}/>
                        </div>
                    </div>
                </li> :
                <li className="message-item">
                    {
                        wrap ?
                        <div className="message-item-wrapper--combo">
                            <div className="message-item__content">
                                <div className="message-content-text">
                                    {
                                        period >= 20 ?
                                        <div className="text-name">
                                            {message.sender.username.split(' ')[message.sender.username.split(' ').length - 1]}
                                        </div> : null
                                    }
                                    <div className="text-content">
                                        {message.text}
                                    </div>
                                    {
                                        message.media.length > 0 ?
                                        <div className="media-content">
                                            {
                                                message.media.map((me, index)=>(
                                                <div 
                                                className="media-content-item"
                                                key={index}
                                                onClick={()=>handleMediaDetail(me)}
                                                >
                                                    <img src={me.url} alt="" />
                                                </div>
                                                ))
                                            }
                                        </div> : null
                                    }
                                </div>
                                <MessageContentTool updatedAt={message.updatedAt}/>
                            </div>
                        </div> :
                        <div className="message-item-wrapper">
                            <div className="message-item__avatar">
                                <img src={message.sender.avatar || UserAvatarImg} alt="" />
                            </div>
                            <div className="message-item__content">
                                <div className="message-content-text">
                                    <div className="text-name">
                                        {message.sender.username.split(' ')[message.sender.username.split(' ').length - 1]}
                                    </div>
                                    <div className="text-content">
                                        {message.text}
                                    </div>
                                    {
                                        message.media.length > 0 ?
                                        <div className="media-content">
                                            {
                                                message.media.map((me, index)=>(
                                                <div 
                                                className="media-content-item"
                                                key={index}
                                                onClick={()=>handleMediaDetail(me)}
                                                >
                                                    <img src={me.url} alt="" />
                                                </div>
                                                ))
                                            }
                                        </div> : null
                                    }
                                </div>
                                <MessageContentTool updatedAt={message.updatedAt}/>
                            </div>
                        </div>
                    }
                </li>
            } 
        </>
    );
}

export default MessageItem;