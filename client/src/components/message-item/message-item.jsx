import React, { useState } from 'react';
import './message-item.scss';
import messToolIcon from '../../assets/json-data/mess-tool-icon.json';
import ToolTip from '../tooltip/tooltip';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import moment from 'moment';

function MessageItem({messageType, message}) {
    const [messIconTooltip, setMessIconTooltip] = useState(null);
    // console.log(message)
    return (
        <li className={`message-item ${messageType === 0 ? 'message-item--reverse' : ''}`}>
            <div className="message-item-wrapper">
                {
                    messageType !== 0 ?
                        <div className="message-item__avatar">
                            <img src={message.sender.avatar || UserAvatarImg} alt="" />
                        </div> : null
                }
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
                    </div>
                    <div className="message-content-tool">
                        <span className="message-content-tool__time">
                            {moment(message.updatedAt).fromNow()}
                        </span>
                        <div className="message-content-tool__icon">
                            {
                                messToolIcon.map((meToIc, index) => (
                                    <div
                                        key={index}
                                        className="tool-icon-wrapper"
                                        onMouseOver={()=>setMessIconTooltip(index)}
                                        onMouseOut={()=>setMessIconTooltip(null)}
                                    >
                                        <span>
                                            <i className={meToIc.icon}></i>
                                        </span>
                                        <ToolTip 
                                            content={meToIc.tooltipContent}
                                            status={messIconTooltip === index ? true : false } 
                                            colorClass='--third-color'
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default MessageItem;