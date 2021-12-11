import React from 'react';
import LikeImg from '../../assets/images/like.png';

function PostFooter({handleCommentBox, likeCount, commentCount}) {
    return (
        <div className="post-item__footer">
            {
                likeCount > 0 ?
                    <div className="post-footer-like">
                        <span>{likeCount}</span>
                        <span>
                            <img src={LikeImg} alt="" />
                        </span>
                    </div> : null
            }
            {
                commentCount > 0 ?
                    <div 
                        className="post-footer-comment"
                        onClick={handleCommentBox}
                    >
                        <span>{commentCount}</span>
                        <span>comments</span>
                    </div> : null
            }
        </div>
    );
}

export default PostFooter;