import React from 'react';
import GirlImg from './../../assets/images/girl.png';

function MenuPostLeft() {
    return (
        <div className="menu-post__left">
            <a href="#vv" className="menu-post-left-avatar">
                <img src={GirlImg} alt="" />
            </a>
            <div className="menu-post-left-action">
                <div className="action-btn">
                    What do you think?
                </div>
            </div>
        </div>
    );
}

export default MenuPostLeft;