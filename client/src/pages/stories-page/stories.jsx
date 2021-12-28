import React from 'react';
import StoriesLeft from './stories-left';
import StoriesRight from './stories-right';
import './stories.scss';

function Stories(props) {
    return (
        <div className="main-content">
        <title>Stories | Connecto</title>
        <div className="main-container">
            <div className="main-body">
                <div className="stories-wrapper">
                    <div className="stories">
                        <StoriesLeft />
                        <StoriesRight />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Stories;