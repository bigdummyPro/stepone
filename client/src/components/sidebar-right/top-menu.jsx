import React from 'react';

function TopMenu(props) {
    return (
        <div className="sidebar-right__top-menu">
            <div className="top-menu-input">
                <span><i className="fas fa-search"></i></span>
                <input type="text" name="" id="" placeholder="Search"/>
            </div>
            <div className="top-menu-action">
                <div className="top-menu-action__icon">
                    <span className="icon-bell">
                        <i className="fas fa-bell"></i>
                    </span>
                </div>
                <div className="top-menu-action__modal"></div>
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