import React from 'react';

function MenuPostRight() {
    return (
        <div className="menu-post__right">
            <ul className="menu-post-right-list">
                <li className="menu-post-right-item">
                    <span className="red-icon"><i className="fas fa-video"></i></span>
                    <span>Livestream</span>
                </li>
                <li className="menu-post-right-item">
                    <span className="green-icon"><i className="fas fa-images"></i></span>
                    <span>Image/Video</span>
                </li>
                <li className="menu-post-right-item">
                    <span className="orange-icon"><i className="far fa-grin-stars"></i></span>
                    <span>Emotion</span>
                </li>
            </ul>
        </div>
    );
}

export default MenuPostRight;