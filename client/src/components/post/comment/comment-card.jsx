import React from 'react';
import {Link} from 'react-router-dom';
import UserAvatarImg from '../../../assets/images/user-avatar.png';
import moment from 'moment'

function CommentCard({levelKey, handleReply, comment}) {
    
    return (
        <div 
            className={`comment-box-item--style comment-box-item__lv${levelKey}`}
        >
            {
                levelKey === 3 ? 
                    <div className="comment-box-curve"></div> :
                    <div className="comment-box-line"></div>
            }
            <Link to="#vv" className="comment-box-avatar">
                <img src={comment.user.avatar || UserAvatarImg} alt="" />
            </Link>
            <div className="comment-box-body">
                <div className="comment-box-body__content">
                    <span className="comment-content-name">
                        {comment.user.username}
                    </span>
                    <span className="comment-content-text">
                        {comment.content}
                    </span>
                </div>
                <div className="comment-box-body__tool">
                    <span className="comment-tool comment-tool-like">
                        Like
                    </span>
                    <span 
                        className="comment-tool comment-tool-reply"
                        onClick={()=>handleReply(comment)}
                    >
                        Reply
                    </span>
                    <span className="comment-tool comment-tool-time">
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CommentCard;