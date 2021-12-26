import React, { useEffect, useState } from 'react';
import CommentCreateBox from './comment-create-box';
import CommentBoxLv1Item from './comment/comment-box-lv1-item';
import CommentBoxToggleTool from './comment/comment-box-toggle-tool';

function PostCommentBox({commentFocusStatus, post, auth}) {
    const [comments, setComments] = useState([]);
    const [showComment, setShowComment] = useState([]);
    const [next, setNext] = useState(2);

    const [replyComments, setReplyComments] = useState([]);

    useEffect(()=>{
        const newCm = post.comments.filter(comment => !comment.reply);
        setComments(newCm);
        setShowComment(newCm.reverse().slice(0, next));
    },[post.comments, next])

    useEffect(()=>{
        const newRepCm = post.comments.filter(comment => comment.reply);
        setReplyComments(newRepCm);
    },[post.comments])
    
    return (
        <div className="post-item__comment-box">
            <div className="comment-box-list">
                {
                    showComment.reverse().map((comment, index)=>(
                        <CommentBoxLv1Item 
                            key={index}
                            comment={comment}
                            replyComments={replyComments}
                            auth={auth}
                            post={post}
                        />
                    ))
                }
            </div>
            <div className="comment-box-toggle">
                <CommentBoxToggleTool 
                    repCms={comments}
                    next={next}
                    setNext={(value)=>setNext(value)}
                />
            </div>
            <CommentCreateBox 
                commentFocusStatus={commentFocusStatus}
                boxType="medium"
                onReply={{activeComment: null, parentCommentId: null, replyStatus: null}}
                post={post}
                auth={auth}
                resetOnReply={null}
            />
        </div>
    );
}

export default PostCommentBox;