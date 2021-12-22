import React, { useEffect, useState } from 'react';
import CommentCreateBox from '../comment-create-box';
import CommentBoxLv2Item from './comment-box-lv2-item';
import CommentBoxToggleTool from './comment-box-toggle-tool';
import CommentCard from './comment-card';


function CommentBoxLv1Item({comment, replyComments, auth, post}) {

    const [commentFocusStatusLv1, setCommentFocusStatusLv1] = useState(null);
    const [repCmsLv2, setRepCmsLv2] = useState([]);
    const [showRepCmsLv2, setShowRepCmsLv2] = useState([]);
    const [next, setNext] = useState(2);

    const [onReply, setOnReply] = useState({activeComment: null, parentCommentId: null, replyStatus: null});

    const handleReply = (lv1Comment) => {
        setCommentFocusStatusLv1(!commentFocusStatusLv1);

        setOnReply({
            activeComment: lv1Comment.user._id !== auth.user._id ? lv1Comment : null, 
            parentCommentId: comment._id, 
            replyStatus: true
        });
    }

    useEffect(()=>{
        const newRepCmsLv2 = replyComments.filter(repCm => repCm.reply === comment._id)
        setRepCmsLv2(newRepCmsLv2);
        setShowRepCmsLv2(newRepCmsLv2.slice(0, next));

    },[replyComments, comment._id, next])

    return (
        <div className={`comment-box-item comment-box-lv1-item ${repCmsLv2.length === 0 && !onReply.replyStatus ? '--empty-child' : ''}`}>
            <CommentCard 
                levelKey={1}
                handleReply={(lv1Comment)=>handleReply(lv1Comment)}
                comment={comment}
                post={post}
            />
            <div className={`comment-box-item comment-box-item__child comment-box-lv2-list ${!onReply.replyStatus ? '--non-input' : ''} ${repCmsLv2.length <= 2 ? '--non-toggle' : ''} ${onReply.replyStatus || repCmsLv2.length > 2 ? '--both-style' : ''}`}>
                {
                    showRepCmsLv2.map((repCm, index)=>(
                        <CommentBoxLv2Item 
                            key={index}
                            comment={repCm}
                            replyComments={replyComments}
                            auth={auth}
                            post={post}
                        />
                    ))
                }
                <div className="comment-box-lv2-item comment-box-toggle-tool">
                    <div className="comment-box-curve"></div>
                    <div className="comment-box-line comment-box-line-lv2--toggle"></div>
                    <CommentBoxToggleTool 
                        repCms={repCmsLv2}
                        next={next}
                        setNext={(value)=>setNext(value)}
                    />
                </div>
                <div className="comment-box-lv2-item comment-box-lv2-input">
                    <div className="comment-box-curve"></div>
                    <CommentCreateBox 
                        commentFocusStatus={commentFocusStatusLv1}
                        boxType="small"
                        auth={auth}
                        onReply={onReply}
                        post={post}
                        resetOnReply={()=>setOnReply({activeComment: null, parentCommentId: comment._id, replyStatus: null})}
                    />
                </div>
            </div>
        </div>
    );
}

export default CommentBoxLv1Item;