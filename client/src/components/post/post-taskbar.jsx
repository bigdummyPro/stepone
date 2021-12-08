import React, { useEffect, useState } from 'react';
import { likePost, unLikePost } from '../../redux/actions/postAction';

function PostTaskbar({setCommentFocus, auth, dispatch, socket, post}) {
    const [isLike, setIsLike] = useState(false);
    const [likeActionLoad, setLikeActionLoad] = useState(false);

    const handleLike = async() => {
        //kiểm tra likeActionLoad để ngăn chặn việc người dùng click liên tục button mà chương trình chưa xử lí kịp
        if(likeActionLoad) return;

        setLikeActionLoad(true);
        await dispatch(likePost({post, auth, socket}));
        setLikeActionLoad(false);
    }
    const handleUnLike = async() => {
        if(likeActionLoad) return;

        setLikeActionLoad(true);
        await dispatch(unLikePost({post, auth, socket}));
        setLikeActionLoad(false);
    }

    useEffect(()=>{
        if(post.likes.find(liLi => liLi._id === auth.user._id)){
            setIsLike(true);
        }else{
            setIsLike(false);
        }
    },[auth.user._id, post.likes])

    return (
        <div className="post-item__taskbar">
            {
                !isLike ?
                    <span 
                        className="post-taskbar-icon post-taskbar-like"
                        onClick={handleLike}
                    >
                        <i className="fas fa-thumbs-up"></i>
                        Like
                    </span> :
                    <span 
                        className="post-taskbar-icon post-taskbar-like --active"
                        onClick={handleUnLike}
                    >
                        <i className="fas fa-thumbs-up"></i>
                        Like
                    </span>
            }
            <span 
                className="post-taskbar-icon post-taskbar-comment"
                onClick={setCommentFocus}
            >
                <i className="fas fa-comment-alt"></i>
                Comment
            </span>
            <span className="post-taskbar-icon post-taskbar-save">
                <i className="fas fa-save"></i>
                Save
            </span>
        </div>
    );
}

export default PostTaskbar;