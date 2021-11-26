import React from 'react';
import './home.scss';
import Post from '../../components/post/post';

function Home() {
    return (
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
    );
}

export default Home;