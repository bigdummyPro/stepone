import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, isReadUpdate } from '../../redux/actions/notificationAction';
import clickOutsideRef from '../../utils/dropdown-event';
import {Link} from 'react-router-dom';
import moment from 'moment';
import UserAvatarImg from './../../assets/images/user-avatar.png';
import EmptyImg from '../../assets/images/empty-noti.png';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';

function TopMenu() {

    const menu_noti_modal_content = useRef(null);
    const top_menu_toggle_icon = useRef(null);

    const dispatch = useDispatch();
    const notificationState = useSelector(state => state.notificationReducer);

    const handleIsRead = (notification) => {
        dispatch(isReadUpdate({notification}));
    }
    const [notiCount, setNotiCount] = useState({type: null, value: null});

    useEffect(()=>{
        if(notificationState.data.length > 0){
            const isReadCount = notificationState.data.filter(item => !item.isRead).length;
            if(isReadCount < 5){
                setNotiCount({type: 0, value: isReadCount});
            }else{
                setNotiCount({type: 1, value: '5+'});
            }
        }else{
            setNotiCount({type: null, value: null})
        }
    },[notificationState])

    useEffect(()=>{
        const sidebarEl = document.querySelector('.sidebar-right-container') || document.querySelector('.sidebar-right-container .--active');
        clickOutsideRef(menu_noti_modal_content, top_menu_toggle_icon, sidebarEl);
    },[])

    useEffect(()=>{
        dispatch(getNotifications(dispatch));
    },[])

    const vv =() => {
        dispatch({type: GLOBALTYPES.UPDATE_NOTIFICATION_SOUND, payload: !notificationState.sound})
    }
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
                    {
                        notiCount.value ? 
                        <span className={`noti-badge ${notiCount.type === 1 && '--more'}`}>
                            {notiCount.value}
                        </span> : null
                    }
                </div>
                <div className="top-menu-action__modal menu-noti__modal" ref={menu_noti_modal_content}>
                    {
                        notificationState && notificationState.data.length > 0 ?
                        <>
                            <div className="noti-modal-list">
                                {
                                    notificationState && notificationState.data.map((noti, index)=>(
                                        <Link 
                                            key={index}
                                            to={noti.url} 
                                            className="noti-modal-item"
                                            onClick={()=>handleIsRead(noti)}
                                        >
                                            <div className="noti-modal-item__avatar">
                                                <img src={noti.user.avatar || UserAvatarImg} alt="" />
                                            </div>
                                            <div className="noti-modal-item__body">
                                                <span className="noti-item-content">
                                                    <p>{noti.user.username}</p>
                                                    {noti.text}
                                                </span>
                                                <span className="noti-item-time">
                                                    {moment(noti.createdAt).fromNow()}
                                                </span>
                                            </div>
                                            {
                                                !noti.isRead &&
                                                <span className="active-dot"></span>
                                            }
                                        </Link>

                                    ))
                                }
                            </div>
                            {
                                notificationState.data.length > 5 &&
                                <div className="noti-modal-see-more">
                                    <button className="btn btn--primary btn--radius-5px">
                                        See All
                                    </button>
                                </div>
                            }
                        </> : 
                        <div className="noti-modal-empty">
                            <img src={EmptyImg} alt="" />
                            <span>Empty Notification</span>
                        </div>
                    }
                </div>
            </div>
            <div className="top-menu-action">
                <div className="top-menu-action__icon" onClick={vv}>
                    <span className="icon-bell">
                        <i className="fas fa-bookmark"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TopMenu;