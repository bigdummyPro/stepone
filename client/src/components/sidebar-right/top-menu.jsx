import React, { useEffect, useRef } from 'react';
import clickOutsideRef from '../../utils/dropdown-event';
import GirlImage from './../../assets/images/girl.png';

function TopMenu() {


    const menu_noti_modal_content = useRef(null);
    const top_menu_toggle_icon = useRef(null);


    useEffect(()=>{
        const sidebarEl = document.querySelector('.sidebar-right-container') || document.querySelector('.sidebar-right-container .--active');
        clickOutsideRef(menu_noti_modal_content, top_menu_toggle_icon, sidebarEl);
    },[])

    return (
        <div className="sidebar-right__top-menu">
            <div className="top-menu-input">
                <span><i className="fas fa-search"></i></span>
                <input type="text" name="" id="" placeholder="Search"/>
            </div>
            <div className="top-menu-action menu-noti">
                <div 
                    className="top-menu-action__icon" 
                    ref={top_menu_toggle_icon}
                >
                    <span className="icon-bell">
                        <i className="fas fa-bell"></i>
                    </span>
                </div>
                <div className="top-menu-action__modal menu-noti__modal" ref={menu_noti_modal_content}>
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