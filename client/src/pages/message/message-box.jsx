import React from 'react';
import GirlImg from '../../assets/images/girl.png';

function MessageItem(props) {
    return (
        <div className="message-box">
            <div className="message-box__left">
                <img src={GirlImg} alt="" />
            </div>
            <div className="message-box__center">
                <span className="message-box-name">
                    Nguyễn Hoàng Khánh Ngân
                </span>
                <span className="message-box-description">
                    Ok bạn ơi!!
                </span>
            </div>
            <div className="message-box__right">
                <span className="message-time">2 ngày</span>
                <div className="message-tool">
                    <span className="message-tool__icon">
                        <i className="fas fa-ellipsis-h"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MessageItem;