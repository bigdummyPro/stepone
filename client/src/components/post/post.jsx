import React from 'react';
import './post.scss';
import PostHeader from './post-header';
import PostBody from './post-body';
import PostFooter from './post-footer';
import PostTaskbar from './post-taskbar';

function Post() {
    return (
        <div className="post-item-wrapper">
            <div className="post-item">
                <PostHeader />
                <PostBody />
                <PostFooter />
                <PostTaskbar />
            </div>
        </div>
    );
}

export default Post;