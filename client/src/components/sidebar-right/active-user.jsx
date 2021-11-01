import React from 'react';
import GirlImage from '../../assets/images/girl.png'

function ActiveUser(props) {
    return (
        <div className="sidebar-right__active-user">
            <div className="active-user-title">
                Active Users
            </div>
            <ul className="active-user-list">
                <li className="active-user-item">
                    <div className="user-item-avatar">
                        <img src={GirlImage} alt="" />
                    </div>
                    <div className="user-item-info">
                        <a href="#vv">Phan Thành Minh</a>
                        <span>thanhminh@gmail.com</span>
                    </div>
                    <button className="btn btn--primary btn--radius-5px user-item-button">Chat</button>
                </li>
                <li className="active-user-item">
                    <div className="user-item-avatar">
                        <img src={GirlImage} alt="" />
                    </div>
                    <div className="user-item-info">
                        <a href="#vv">Phan Thành Minh</a>
                        <span>thanhminh@gmail.com</span>
                    </div>
                    <button className="btn btn--primary btn--radius-5px user-item-button">Chat</button>
                </li>
                <li className="active-user-item">
                    <div className="user-item-avatar">
                        <img src={GirlImage} alt="" />
                    </div>
                    <div className="user-item-info">
                        <a href="#vv">Phan Thành Minh</a>
                        <span>thanhminh@gmail.com</span>
                    </div>
                    <button className="btn btn--primary btn--radius-5px user-item-button">Chat</button>
                </li>
            </ul>
            <div className="active-user-see-all">
                <span>See All</span>
            </div>
        </div>
    );
}

export default ActiveUser;