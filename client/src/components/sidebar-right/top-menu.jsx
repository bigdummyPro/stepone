import React, { useRef } from 'react';
import clickOutsideRef from '../../utils/dropdown-event';
import GirlImage from './../../assets/images/girl.png';

function TopMenu(props) {


    const dropdown_content_el = useRef(null);
    const dropdown_toggle_el = useRef(null);

    clickOutsideRef(dropdown_content_el, dropdown_toggle_el);

    return (
        <div className="sidebar-right__top-menu">
            <div className="top-menu-input">
                <span><i className="fas fa-search"></i></span>
                <input type="text" name="" id="" placeholder="Search"/>
            </div>
            <div className="top-menu-action menu-noti">
                <div className="top-menu-action__icon" ref={dropdown_toggle_el}>
                    <span className="icon-bell">
                        <i className="fas fa-bell"></i>
                    </span>
                </div>
                <div className="top-menu-action__modal menu-noti__modal" ref={dropdown_content_el}>
                    <div className="noti-modal-list">
                        <a href="#vv" className="noti-modal-item">
                            <div className="noti-modal-item__avatar">
                                <img src={GirlImage} alt="" />
                            </div>
                            <div className="noti-modal-item__body">
                                <span className="noti-item-content">
                                    You had a new friend request
                                </span>
                                <span className="noti-item-time">
                                    2 weeks ago
                                </span>
                            </div>
                        </a>
                        <a href="#vv" className="noti-modal-item">
                            <div className="noti-modal-item__avatar">
                                <img src={GirlImage} alt="" />
                            </div>
                            <div className="noti-modal-item__body">
                                <span className="noti-item-content">
                                    You had a new friend request
                                </span>
                                <span className="noti-item-time">
                                    2 weeks ago
                                </span>
                            </div>
                        </a><a href="#vv" className="noti-modal-item">
                            <div className="noti-modal-item__avatar">
                                <img src={GirlImage} alt="" />
                            </div>
                            <div className="noti-modal-item__body">
                                <span className="noti-item-content">
                                    You had a new friend request
                                </span>
                                <span className="noti-item-time">
                                    2 weeks ago
                                </span>
                            </div>
                        </a><a href="#vv" className="noti-modal-item">
                            <div className="noti-modal-item__avatar">
                                <img src={GirlImage} alt="" />
                            </div>
                            <div className="noti-modal-item__body">
                                <span className="noti-item-content">
                                    You had a new friend request
                                </span>
                                <span className="noti-item-time">
                                    2 weeks ago
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="noti-modal-see-more">
                        <button className="btn btn--primary btn--radius-5px">
                            See All
                        </button>
                    </div>
                </div>
            </div>
            <div className="top-menu-action">
                <div className="top-menu-action__icon">
                    <span className="icon-bell">
                        <i className="fas fa-bookmark"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TopMenu;