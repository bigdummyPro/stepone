import React, { useState } from 'react';
import StoriesLeft from './stories-left';
import StoriesRight from './stories-right';
import './stories.scss';

function Stories(props) {
    const [storiesLeftStatus, setStoriesLeftStatus] = useState(true);
    return (
        <div className="main-content">
        <title>Stories | Connecto</title>
        <div className="main-container">
            <div className="main-body">
                <div className="stories-page-wrapper">
                    <div className={`stories ${!storiesLeftStatus ? '--hide-left' : ''}`}>
                        <StoriesLeft 
                            closeStoriesLeft={()=>setStoriesLeftStatus(false)}
                        />
                        <StoriesRight 
                            openStoriesLeft={()=>setStoriesLeftStatus(true)}
                            storiesLeftStatus={storiesLeftStatus}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Stories;