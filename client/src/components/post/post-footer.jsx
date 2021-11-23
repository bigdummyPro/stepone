import React from 'react';

function PostFooter({handleCommentBox}) {
    return (
        <div className="post-item__footer">
            <div className="post-footer-like">
                <span>5,8k</span>
                <span>likes</span>
            </div>
            <div 
                className="post-footer-comment"
                onClick={handleCommentBox}
            >
                <span>100</span>
                <span>comments</span>
            </div>
        </div>
    );
}

export default PostFooter;