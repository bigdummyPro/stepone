import React, { useState } from 'react';

function StoriesRightTool({togglePlayStatus}) {
    const [toggleStatus, setToggleStatus] = useState(togglePlayStatus.current);

    const handlePlayPause = () => {
        setToggleStatus(!toggleStatus);
        togglePlayStatus.current = !togglePlayStatus.current;
    }
    return (
        <div className="description-tool">
            <div 
                className="desciption-tool-item description-tool__play"
                onClick={handlePlayPause}
            >
                {
                    toggleStatus ?
                    <span><i className="fas fa-pause"></i></span> : 
                    <span><i className="fas fa-play"></i></span> 
                }
            </div>
            <div className="desciption-tool-item description-tool__more">
                <span>
                    <i className="fas fa-ellipsis-h"></i>
                </span>
            </div>
        </div>
    );
}

export default StoriesRightTool;