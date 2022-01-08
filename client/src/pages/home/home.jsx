import React from 'react';
import './home.scss';
import MediaShowModal from '../../components/media-show-modal/media-show-modal';
import StoriesList from '../../components/stories-list/stories-list';
import HomePost from './home-posts';

function Home() {
    return (
        <div className="main-content">
            <title>Home | Connecto</title>
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