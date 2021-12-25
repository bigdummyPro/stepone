import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router';
import sidebarLeftMenu from '../../assets/json-data/sidebar-left-menu.json';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../../redux/actions/messageAction';

function Menu() {
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const [messageCount, setMessageCount] = useState(null);
    const location = useLocation();

    const messageState = useSelector(state => state.messageReducer);
    const authState = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    
    const {user} = useSelector(state => state.authReducer);

    useEffect(()=>{
        //Clone mảng để khi thay đổi không ảnh hưởng mảng gốc(mảng json)
        const sidebarLeftMenuArr = [...sidebarLeftMenu];

        if(location.pathname !== '/'){
            //Tìm vị trí index của url trang chủ
            const homeIndex = sidebarLeftMenuArr.findIndex(item => item.link === '/');
            //Clone mảng để khi thay đổi không ảnh hưởng mảng gốc(mảng json)
            const homeMenuItem = {...sidebarLeftMenuArr[homeIndex]};
            //Set url trang chủ để tính toán được include bên dưới vì nếu trang chủ là / thì mọi include đều đúng
            homeMenuItem.link = '/home';

            sidebarLeftMenuArr[homeIndex] = homeMenuItem;
        }
        const activeIndex = sidebarLeftMenuArr.findIndex(siLeMeArr => location.pathname.includes(siLeMeArr.link));

        setActiveMenuIndex(activeIndex);
    },[location.pathname])

    useEffect(()=>{
        if(messageState.firstLoad) return;
        dispatch(getConversations({auth: authState, page: 10}))
    },[])

    useEffect(()=>{
        if(messageState.conversations.length <= 0) return;

        const newConv = messageState.conversations.filter(conv => conv.isRead.filter(item => item._id === user._id).length <= 0)

        setMessageCount(newConv.length);
    },[messageState.conversations])

    return (
        <div className="sidebar-left__menu">
            <div className="menu-title">Menu</div>
            <div className="menu-list">
                {
                    sidebarLeftMenu.map((siLeMe, index) => (
                        <Link 
                            to={user._id && siLeMe.link === '/profile' ? `/profile/${user._id}/post` : siLeMe.link} 
                            className={`menu-item ${activeMenuIndex === index ? '--active' : ''}`}
                            key={index}
                        >
                            <i className={siLeMe.icon}></i>
                            {siLeMe.content}
                            {
                                siLeMe.link === '/message' && messageCount ?
                                <span className="message-count-badge">
                                    {
                                        messageCount < 5 ? 
                                        messageCount : '5+'
                                    }
                                </span> : null
                            }
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Menu;