import React from 'react';
import { useState } from 'react';
import CommentCreateBox from '../comment-create-box';
import CommentCard from './comment-card';

function CommentBoxLv2Item({comment, post, auth}) {
    const [commentFocusStatusLv2, setCommentFocusStatusLv2] = useState(null);
    const handleReply = () => {
        setCommentFocusStatusLv2(!commentFocusStatusLv2);
    }
    // console.log(comment)
    return (
        <div className="comment-box-lv2-item">
            <div className="comment-box-curve"></div>
            <div className="comment-box-line"></div>
            <CommentCard 
                levelKey={2}
                handleReply={()=>handleReply()}
                comment={comment}
            />
            <div className="comment-box-item comment-box-item__child comment-box-lv3-list">
                {/* <div className="comment-box-lv3-item">
                    <div className="comment-box-line"></div>
                    <div className="comment-box-curve"></div>
                    <CommentCard 
                        levelKey={3}
                        handleReply={()=>handleReply()}
                    />
                </div>
                <div className="comment-box-lv3-item">
                    <div className="comment-box-line"></div>
                    <div className="comment-box-curve"></div>
                    <CommentCard 
                        levelKey={3}
                        handleReply={()=>handleReply()}
                    />
                </div> */}
                <div className="comment-box-lv3-item">
                    <div className="comment-box-curve"></div>
                    <CommentCreateBox 
                        commentFocusStatus={commentFocusStatusLv2}
                        boxType="small"
                        onReply={null}
                        post={post}
                        auth={auth}
                    />
                </div>
            </div>
        </div>
    );
}

export default CommentBoxLv2Item;