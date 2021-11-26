import React from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router';
import sidebarLeftMenu from '../../assets/json-data/sidebar-left-menu.json';

function Menu() {
    const location = useLocation();
    const activeMenuIndex = sidebarLeftMenu.findIndex(siLeMe => siLeMe.link === location.pathname);

    return (
        <div className="sidebar-left__menu">
            <div className="menu-title">Menu</div>
            <div className="menu-list">
                {
                    sidebarLeftMenu.map((siLeMe, index) => (
                        <Link 
                            to={siLeMe.link} 
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