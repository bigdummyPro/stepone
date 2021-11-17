import React, { useState } from 'react';
import './message-item.scss';
import messToolIcon from '../../assets/json-data/mess-tool-icon.json';
import ToolTip from '../tooltip/tooltip';
import GirlImg from '../../assets/images/girl.png';

function MessageItem({messageType}) {
    const [messIconTooltip, setMessIconTooltip] = useState(null);
    return (
        <li className={`message-item ${messageType === 0 ? 'message-item--reverse' : ''}`}>
            <div className="message-item-wrapper">
                <div className="message-item__avatar">
                    <img src={GirlImg} alt="" />
                </div>
                <div className="message-item__content">
                    <div className="message-content-text">
                        {
                            messageType !== 0 ?
                                <div className="text-name">Ngân</div> : null
                        }
                        <div className="text-content">
                            Xin chào, mình muốn kết bạn để trò chuyện
                        </div>
                    </div>
                    <div className="message-content-tool">
                        <span className="message-content-tool__time">
                            11:50AM, 16/11/2021
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