import React, { useState } from 'react';
import './post.scss';
import PostHeader from './post-header';
import PostBody from './post-body';
import PostFooter from './post-footer';
import PostTaskbar from './post-taskbar';
import PostCommentBox from './post-comment-box';

function Post({post, auth, dispatch, socket}) {
    const [commentBoxStatus, setCommentBoxStatus] = useState(false);
    const [commentFocusStatus, setCommentFocusStatus] = useState(null);

    const actionInCommentBox = () => {
        setCommentBoxStatus(!commentBoxStatus);
        if(commentFocusStatus !== null) setCommentFocusStatus(null);
    }
    return (
        <div className="post-item-wrapper">
            <div className="post-item">
                <PostHeader 
                    user={post.user}
                    createdAt={post.createdAt}
                    post={post}
                    auth={auth}
                    dispatch={dispatch}
                    socket={socket}
                />
                <PostBody 
                    content={post.content}
                    images={post.images}
                    videos={post.videos}
                    audios={post.audios}
                />
                <PostFooter 
                    handleCommentBox={actionInCommentBox}
                    likeCount={post.likes.length}
                    commentCount={post.comments.length}
                />
                <PostTaskbar 
                    setCommentFocus={()=>setCommentFocusStatus(!commentFocusStatus)}
                    auth={auth}
                    dispatch={dispatch}
                    socket={socket}
                    post={post}
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