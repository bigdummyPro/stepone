import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentCreateBox from './comment-create-box';
import CommentBoxLv1Item from './comment/comment-box-lv1-item';

function PostCommentBox({commentFocusStatus, post, auth}) {
    const [comments, setComments] = useState([]);

    const [replyComments, setReplyComments] = useState([]);

    useEffect(()=>{
        const newCm = post.comments.filter(comment => !comment.reply);
        setComments(newCm);
    },[post.comments])

    useEffect(()=>{
        const newRepCm = post.comments.filter(comment => comment.reply);
        setReplyComments(newRepCm);
    },[post.comments])
    return (
        <div className="post-item__comment-box">
            <div className="comment-box-list">
                {
                    comments.map((comment, index)=>(
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
            <CommentCreateBox 
                commentFocusStatus={commentFocusStatus}
                boxType="medium"
                onReply={{activeComment: null, parentCommentId: null, replyStatus: null}}
                post={post}
                auth={auth}
            />
        </div>
    );
}

export default PostCommentBox;