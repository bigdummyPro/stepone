import React from 'react';

function ViewerCount({currStories, currChildStoriesIndex, user}) {
    return (
        <div className="storie-right-footer__viewer-count">
            <span>
                <b>
                    {currStories && currStories[currChildStoriesIndex]?.viewerIds.filter(item => item._id !== user._id).length}
                </b> Viewers
            </span>
            <span>
                <b>
                    {currStories && currStories[currChildStoriesIndex]?.likeIds.filter(item => item._id !== user._id).length}
                </b> Emotions
            </span>
        </div>
    );
}

export default ViewerCount;