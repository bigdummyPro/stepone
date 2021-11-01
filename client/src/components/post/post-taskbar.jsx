import React from 'react';

function PostTaskbar(props) {
    return (
        <div className="post-item__taskbar">
            <span className="post-taskbar-icon post-taskbar-like">
                <i className="fas fa-thumbs-up"></i>
                Like
            </span>
            <span className="post-taskbar-icon post-taskbar-comment">
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