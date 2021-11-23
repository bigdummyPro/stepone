import React, { useState } from 'react';
import './post.scss';
import PostHeader from './post-header';
import PostBody from './post-body';
import PostFooter from './post-footer';
import PostTaskbar from './post-taskbar';
import PostCommentBox from './post-comment-box';

function Post() {
    const [commentBoxStatus, setCommentBoxStatus] = useState(false);
    const [commentFocusStatus, setCommentFocusStatus] = useState(null);

    const actionInCommentBox = () => {
        setCommentBoxStatus(!commentBoxStatus);
        if(commentFocusStatus !== null) setCommentFocusStatus(null);
    }
    return (
        <div className="post-item-wrapper">
            <div className="post-item">
                <PostHeader />
                <PostBody />
                <PostFooter 
                    handleCommentBox={actionInCommentBox}
                />
                <PostTaskbar 
                    setCommentFocus={()=>setCommentFocusStatus(!commentFocusStatus)}
                />
                {
                    commentBoxStatus ?
                        <PostCommentBox 
                            commentFocusStatus={commentFocusStatus}
                        /> : null
                }
            </div>
        </div>
    );
}

export default Post;