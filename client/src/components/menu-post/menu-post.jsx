import React from 'react';
import './menu-post.scss';
import MenuPostLeft from './menu-post-left';
import MenuPostRight from './menu-post-right';

function MenuPost(props) {
    return (
        <div className="menu-post-wrapper">
            <div className="menu-post">
                <MenuPostLeft />
                <MenuPostRight />
            </div>
        </div>
    );
}

export default MenuPost;