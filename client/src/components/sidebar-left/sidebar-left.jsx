import React from 'react';
import './sidebar-left.scss';
import Logo from './logo';
import Menu from './menu';
import Account from './account';

function SidebarLeft(props) {
    return (
        <div className="sidebar-left-container">
            <div className="sidebar-left">
                <Logo />
                <Menu />
                <Account />
            </div>
        </div>
    );
}

export default SidebarLeft;