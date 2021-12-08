import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from './../../assets/images/social-web-logo2.png';

function Logo() {
    return (
        <div className="sidebar-left__logo">
            <Link to="/">
                <img src={LogoImage} alt="" />
            </Link>
        </div>
    );
}

export default Logo;