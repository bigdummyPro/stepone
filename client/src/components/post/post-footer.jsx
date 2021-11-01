import React from 'react';

function PostFooter(props) {
    return (
        <div className="post-item__footer">
            <div className="post-footer-like">
                <span><i className="fas fa-thumbs-up"></i></span>
                <span>5,8k</span>
            </div>
            <div className="post-footer-comment">
                <span>100</span>
                <span>comments</span>
            </div>
        </div>
    );
}

export default PostFooter;