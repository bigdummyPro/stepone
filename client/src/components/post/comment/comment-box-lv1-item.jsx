import React, { useEffect, useState } from 'react';
import CommentCreateBox from '../comment-create-box';
import CommentBoxLv2Item from './comment-box-lv2-item';
import CommentCard from './comment-card';


function CommentBoxLv1Item({comment, replyComments, auth, post}) {

    const [repCmsLv2, setRepCmsLv2] = useState([]);

    const [commentFocusStatusLv1, setCommentFocusStatusLv1] = useState(null);
    const [onReply, setOnReply] = useState({activeComment: {}, parentCommentId: null});

    const handleReply = (lv1Comment) => {
        setCommentFocusStatusLv1(!commentFocusStatusLv1);
        setOnReply({activeComment: lv1Comment, parentCommentId: comment._id});
    }

    useEffect(()=>{
        const newRepCmsLv2 = replyComments.filter(repCm => repCm.reply === comment._id)
        setRepCmsLv2(newRepCmsLv2);

        setOnReply({activeComment: {}, parentCommentId: comment._id});
    },[replyComments, comment._id])

    return (
        <div className="comment-box-item comment-box-lv1-item">
            <CommentCard 
                levelKey={1}
                handleReply={(lv1Comment)=>handleReply(lv1Comment)}
                comment={comment}
            />
            <div className="comment-box-item comment-box-item__child comment-box-lv2-list">
                {
                    repCmsLv2.map((repCm, index)=>(
                        <CommentBoxLv2Item 
                            key={index}
                            comment={repCm}
                            replyComments={replyComments}
                            auth={auth}
                            post={post}
                        />
                    ))
                }
                <div className="comment-box-lv2-input">
                    <div className="comment-box-curve"></div>
                    <CommentCreateBox 
                        commentFocusStatus={commentFocusStatusLv1}
                        boxType="small"
                        auth={auth}
                        onReply={onReply}
                        post={post}
                    />
                </div>
            </div>
        </div>
    );
}

export default CommentBoxLv1Item;