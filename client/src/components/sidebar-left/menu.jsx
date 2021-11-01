import React from 'react';

function Menu(props) {
    return (
        <div className="sidebar-left__menu">
            <div className="menu-title">Menu</div>
            <ul className="menu-list">
                <li className="menu-item --active">
                    <i className="fas fa-home"></i>
                    Home
                </li>
                <li className="menu-item">
                    <i className="fas fa-comment-dots"></i>
                    Message
                </li>
                <li className="menu-item">
                    <i className="fas fa-user-alt"></i>
                    Profile
                </li>
                <li className="menu-item">
                    <i className="fas fa-save"></i>
                    Saved Post
                </li>
                <li className="menu-item">
                    <i className="fas fa-cog"></i>
                    Setting
                </li>
            </ul>
        </div>
    );
}

export default Menu;