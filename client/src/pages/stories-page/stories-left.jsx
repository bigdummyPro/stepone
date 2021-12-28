import React from 'react';
import StoriesItem from './stories-item';

function StoriesLeft(props) {
    return (
        <div className="stories-left-wrapper">
            <div className="stories-left">
                <div className="stories-left__header">
                    <span className="stories-header-title">
                        Stories
                    </span>
                    <span className="stories-header-toggle">
                        <i className="fas fa-caret-square-left"></i>
                    </span>
                </div>
                <div className="stories-left__create">
                    <span className="stories-create-text">
                        Create new
                    </span>
                    <span className="stories-create-icon">
                        <i className="fas fa-plus"></i>
                    </span>
                </div>
                <div className="stories-left__body">
                    <div className="stories-body-group">
                        <div className="stories-group-title">
                            Your stories
                        </div>
                        <div className="stories-group-list">
                            <StoriesItem />
                        </div>
                    </div>
                    <div className="stories-body-group">
                        <div className="stories-group-title">
                            All stories
                        </div>
                        <div className="stories-group-list">
                            <StoriesItem />
                            <StoriesItem />
                            <StoriesItem />
                            <StoriesItem />
                            <StoriesItem />
                            <StoriesItem />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoriesLeft;