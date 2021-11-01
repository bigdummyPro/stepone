import React from 'react';
import './stylesheets/home.scss';
import SidebarLeft from '../../components/sidebar-left/sidebar-left';
import SidebarRight from '../../components/sidebar-right/sidebar-right';
import MenuPost from '../../components/menu-post/menu-post';
import Post from '../../components/post/post';

function Home(props) {
    return (
        <div className="wrapper">
            <SidebarLeft />
            <div className="main-content">
                <div className="home-container">
                    <MenuPost />
                    <div className="home-body">
                        <div className="home-body__post">
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        </div>  
                    </div>
                </div>
            </div>
            <SidebarRight />
        </div>
    );
}

export default Home;