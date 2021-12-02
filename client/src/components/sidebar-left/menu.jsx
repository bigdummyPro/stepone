import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router';
import sidebarLeftMenu from '../../assets/json-data/sidebar-left-menu.json';
import { useSelector } from 'react-redux';

function Menu() {
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const location = useLocation();
    
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
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Menu;