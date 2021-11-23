import React from 'react';
import {useSelector} from 'react-redux';
import './home.scss';
import SidebarLeft from '../../components/sidebar-left/sidebar-left';
import SidebarRight from '../../components/sidebar-right/sidebar-right';
import MenuPost from '../../components/menu-post/menu-post';
import Post from '../../components/post/post';
import CreatePostModal from '../../components/create-post-modal/create-post-modal';
import NewBox from '../../components/new-box/new-box';
import EmotionModal from '../../components/emotion-modal/emotion-modal';

function Home() {
    const modalState = useSelector(state => state.modalReducer.createPostModalStatus);
    return (
        <div className="wrapper">
            <SidebarLeft />
            <MenuPost />
            <div className="main-content">
                <div className="main-container">
                    <div className="main-body">
                        <div className="home-wrapper">
                            <div className="home-post">
                                <Post />
                                {/* <Post />
                                <Post />
                                <Post /> */}
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            <SidebarRight />
            {modalState ? <CreatePostModal /> : null}
            <EmotionModal />
        </div>
    );
}

export default Home;