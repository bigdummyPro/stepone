import React from 'react';

function ProgressTimeOut({stories, currIndex, progress}) {

    return (
        <div className="stories-right-progress-list">
            {
                stories && stories.map((story, index) => (
                    <div 
                        className="stories-right-progress-item"
                        key={index}
                    >
                        <div 
                            className="progress-bar"
                            style={{width: 
                                currIndex === index ? 
                                `${progress}%` :
                                index > currIndex ?
                                `0%` : `100%`
                            }}    
                        ></div>
                    </div>
                ))
            }
        </div>
    );
}

export default ProgressTimeOut;