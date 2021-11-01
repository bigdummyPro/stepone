import React from 'react';
// import { Link } from 'react-router-dom';
import LogoImage from './../../assets/images/social-web-logo2.png';

function Logo(props) {
    return (
        <div className="sidebar-left__logo">
            <a href="/">
                <img src={LogoImage} alt="" />
            </a>
        </div>
    );
}

export default Logo;