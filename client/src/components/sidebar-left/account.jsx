import React, { useEffect, useRef } from 'react';
import GirlImage from '../../assets/images/girl.png'
import clickOutsideRef from '../../utils/dropdown-event';

function Account(props) {
    const dropdown_content_el = useRef(null);
    const dropdown_toggle_el = useRef(null);


    useEffect(()=>{
        clickOutsideRef(dropdown_content_el, dropdown_toggle_el, null);
    },[])
    return (
        <div className="sidebar-left__account">
            <div className="account-title">
                <span>Account</span>
                <span ref={dropdown_toggle_el}>
                    <i className="fas fa-caret-down"></i>
                </span>
            </div>
            <div className="account-content" ref={dropdown_content_el}>
                <div className="account-content__front">
                    <div className="account-front-avatar">
                        <img src={GirlImage} alt="" />
                    </div>
                    <div className="account-front-info">
                        <span>Nguyễn Hoàng Khánh Ngân</span>
                        <span>khanhngan@gmail.com</span>
                    </div>
                </div>
                <div className="account-content__back">
                    <ul className="account-back-tool">
                        <li className="account-tool-item">
                            <i className="fas fa-sign-out-alt"></i>
                            Log Out
                        </li>
                        <li className="account-tool-item">
                            <i className="fas fa-cog"></i>
                            Setting
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Account;