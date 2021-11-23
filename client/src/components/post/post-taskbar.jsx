import React from 'react';

function PostTaskbar({setCommentFocus}) {
    return (
        <div className="post-item__taskbar">
            <span className="post-taskbar-icon post-taskbar-like">
                <i className="fas fa-thumbs-up"></i>
                Like
            </span>
            <span 
                className="post-taskbar-icon post-taskbar-comment"
                onClick={setCommentFocus}
            >
                <i className="fas fa-comment-alt"></i>
                Comment
            </span>
            <span className="post-taskbar-icon post-taskbar-save">
                <i className="fas fa-save"></i>
                Save
            </span>
        </div>
    );
}

export default PostTaskbar;