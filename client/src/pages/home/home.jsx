import React, { useEffect } from 'react';
import './home.scss';
import MediaShowModal from '../../components/media-show-modal/media-show-modal';
import StoriesList from '../../components/stories-list/stories-list';
import HomePost from './home-posts';
import autoScrollTop from '../../utils/auto-scroll-top';

function Home() {
    useEffect(()=>{
        autoScrollTop();
    },[])
    return (
        <div className="main-content">
            <title>Home | Stepone</title>
            <div className="main-container">
                <div className="main-body">
                    <div className="home-stories">
                        <StoriesList />
                    </div>
                    <div className="home-wrapper">
                        <HomePost />
                    </div>
                </div>
                <MediaShowModal />
            </div>
        </div>
    );
}

export default Home;
