import React, { useState } from 'react';
import GirlImg from '../../assets/images/girl.png';
import MessageItem from '../../components/message-item/message-item';

function MessageRight() {
    
    const autoResizeHeight = (e) => {
        if(e.target.value !== ''){
            e.target.style.height = '20px';
            e.target.style.height = e.target.scrollHeight + 'px';
        }else{
            e.target.style.height = '20px'
        }
    }
    return (
        <div className="message-right">
            <div className="message-right__top">
                <div className="message-info">
                    <img src={GirlImg} alt="" />
                    <span>Nguyễn Hoàng Khánh Ngân</span>
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
                    <MessageItem messageType={1}/>
                    <MessageItem messageType={0}/>
                    <MessageItem messageType={1}/>
                    <MessageItem messageType={0}/>
                    <MessageItem messageType={1}/>
                    <MessageItem messageType={0}/>
                    <MessageItem messageType={1}/>
                    <MessageItem messageType={0}/>
                </ul>
            </div>
            <div className="message-right__bottom">
                <ul className="message-action">
                    <li className="message-action__item">
                        <i className="fas fa-link"></i>
                    </li>
                    <li className="message-action__item">
                        <i className="fas fa-photo-video"></i>
                    </li>
                </ul>
                <div className="message-input">
                    <div className="message-input__wrapper">
                        <textarea 
                            name="" 
                            id="" 
                            placeholder="Enter your message"
                            onInput={autoResizeHeight}
                        ></textarea>
                        <span><i className="fas fa-grin-stars"></i></span>
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