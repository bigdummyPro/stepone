import React from 'react';
import GirlImage from '../../assets/images/girl.png'

function Account(props) {
    return (
        <div className="sidebar-left__account">
            <div className="account-title">Account</div>
            <div className="account-content">
                <div className="account-content__avatar">
                    <img src={GirlImage} alt="" />
                </div>
                <div className="account-content__info">
                    <span>Nguyễn Hoàng Khánh Ngân</span>
                    <span>khanhngan@gmail.com</span>
                </div>
            </div>
        </div>
    );
}

export default Account;