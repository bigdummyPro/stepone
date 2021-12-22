import React, { useEffect, useState } from 'react';
// import {useSelector} from 'react-redux'
import { likePost, savePost, unLikePost, unSavePost } from '../../redux/actions/postAction';

function PostTaskbar({setCommentFocus, auth, dispatch, socket, post}) {
    const [isLike, setIsLike] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [likeActionLoad, setLikeActionLoad] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false);


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

    const handleSavePost = async () => {
        if(saveLoad) return;

        setSaveLoad(true);
        await dispatch(savePost({post, auth}));
        setSaveLoad(false);
    }

    const handleUnSavePost = async () => {
        if(saveLoad) return;

        setSaveLoad(true);
        await dispatch(unSavePost({post, auth}));
        setSaveLoad(false);
    }

    useEffect(()=>{
        if(post.likes.find(liLi => liLi._id === auth.user._id)){
            setIsLike(true);
        }else{
            setIsLike(false);
        }
    },[auth.user._id, post.likes])

    useEffect(() => {
        if(auth.user.savedPosts.find(id => id === post._id)){
            setSaved(true)
        }else{
            setSaved(false)
        }
    },[auth.user, post._id])

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
            {
                !isSaved ?
                <span 
                    className="post-taskbar-icon post-taskbar-save"
                    onClick={handleSavePost}
                >
                    <i className="fas fa-save"></i>
                    Save
                </span> :
                <span 
                    className="post-taskbar-icon post-taskbar-save --active"
                    onClick={handleUnSavePost}
                >
                    <i className="fas fa-save"></i>
                    Save
                </span>
            }
        </div>
    );
}

export default PostTaskbar;