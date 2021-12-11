import React, { useEffect } from 'react';
import { useState } from 'react';
import CommentCreateBox from '../comment-create-box';
import CommentBoxToggleTool from './comment-box-toggle-tool';
import CommentCard from './comment-card';

function CommentBoxLv2Item({comment, post, auth, replyComments}) {
    const [commentFocusStatusLv2, setCommentFocusStatusLv2] = useState(null);
    const [repCmsLv3, setRepCmsLv3] = useState([]);
    const [showRepCmsLv3, setShowRepCmsLv3] = useState([]);
    const [next, setNext] = useState(2);

    const [onReply, setOnReply] = useState({activeComment: null, parentCommentId: null, replyStatus: null});

    const handleReply = (lvComment) => {
        setCommentFocusStatusLv2(!commentFocusStatusLv2);

        setOnReply({
            activeComment: lvComment.user._id !== auth.user._id ? lvComment : null, 
            parentCommentId: comment._id, 
            replyStatus: true
        });
    }
    useEffect(()=>{
        const newRepCmLv3 = replyComments.filter(repCm => repCm.reply === comment._id)
        setRepCmsLv3(newRepCmLv3);
        setShowRepCmsLv3(newRepCmLv3.slice(0, next));

        setOnReply({activeComment: null, parentCommentId: comment._id, replyStatus: null});
    },[comment._id, replyComments, next])
    return (
        <div className={`comment-box-lv2-item ${repCmsLv3.length === 0 && !onReply.replyStatus ? '--empty-child' : ''}`}>
            <div className="comment-box-curve"></div>
            <div className="comment-box-line comment-box-line--lv2"></div>
            <CommentCard 
                levelKey={2}
                handleReply={(lv2Comment)=>handleReply(lv2Comment)}
                comment={comment}
            />
            <div className={`comment-box-item comment-box-item__child comment-box-lv3-list ${!onReply.replyStatus ? '--non-input' : ''} ${repCmsLv3.length <= 2 ? '--non-toggle' : ''} ${onReply.replyStatus || repCmsLv3.length > 2 ? '--both-style' : ''}`}>
                {
                    showRepCmsLv3.map((repCm, index)=>(
                        <div 
                            className="comment-box-lv3-item"
                            key={index}
                        >
                            <div className="comment-box-line comment-box-line--lv3"></div>
                            <div className="comment-box-curve"></div>
                            <CommentCard 
                                levelKey={3}
                                handleReply={(lv3Comment)=>handleReply(lv3Comment)}
                                comment={repCm}
                            />
                        </div>
                    ))
                }
                <div className="comment-box-lv3-item comment-box-toggle-tool">
                    <div className="comment-box-curve"></div>
                    <div className="comment-box-line comment-box-line-lv3--toggle"></div>
                    <CommentBoxToggleTool 
                        repCms={repCmsLv3}
                        next={next}
                        setNext={(value)=>setNext(value)}
                    />
                </div>
                <div className="comment-box-lv3-item comment-box-lv3-input">
                    <div className="comment-box-curve"></div>
                    <CommentCreateBox 
                        commentFocusStatus={commentFocusStatusLv2}
                        boxType="small"
                        onReply={onReply}
                        post={post}
                        auth={auth}
                    />
                </div>
            </div>
        </div>
    );
}

export default CommentBoxLv2Item;