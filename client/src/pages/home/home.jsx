import React from 'react';
import {useSelector} from 'react-redux';
import './stylesheets/home.scss';
import SidebarLeft from '../../components/sidebar-left/sidebar-left';
import SidebarRight from '../../components/sidebar-right/sidebar-right';
import MenuPost from '../../components/menu-post/menu-post';
import Post from '../../components/post/post';
import CreatePostModal from '../../components/create-post-modal/create-post-modal';

function Home() {
    const modalState = useSelector(state => state.modalReducer.createPostModalStatus);
    return (
        <div className="wrapper">
            <SidebarLeft />
            <div className="main-content">
                <div className="main-container">
                    <MenuPost />
                    <div className="main-body">
                        <div className="home-post">
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        </div>  
                    </div>
                </div>
            </div>
            <SidebarRight />
            {modalState ? <CreatePostModal /> : null}
        </div>
    );
}

export default Home;