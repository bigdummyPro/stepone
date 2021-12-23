import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import ToolTip from '../tooltip/tooltip';
import UserAvatarImg from './../../assets/images/user-avatar.png'
import LoadingImg from './../../assets/images/loading.gif';
import NoDataImg from '../../assets/images/no-data.png';
import { getDataAPI } from '../../utils/fetch-data-api';
import { Link } from 'react-router-dom';

function SavedPost() {
    const [tooltipStatus, setTooltipStatus] = useState(false);
    const [savePosts, setSavePosts] = useState(null);
    const authState = useSelector(state => state.authReducer);

    useEffect(()=>{
        getDataAPI('getSavePosts')
        .then(res => {
            const newRes = [];
            authState.user.savedPosts.forEach(item => {
                res.data.savePosts.forEach(saPo => {
                    if(saPo._id === item) newRes.push(saPo)
                })
            })
            setSavePosts(newRes.reverse());
        })
        .catch(err => console.log(err.message));

        return () => setSavePosts(null)
    },[authState.user.savedPosts])
    
    return (
        <div className="sidebar-right__saved-post">
            <div className="saved-post-title">
                <span>Saved Posts</span>
                {
                    savePosts && savePosts.length > 0 ?
                    <Link to={`/profile/${authState.user._id}/saved`}>See All</Link> : null
                }
            </div>
            {
                savePosts ? 
                    savePosts.length > 0 ?
                    <Link to={`/profile/${authState.user._id}/saved?id=${savePosts[0]._id}`} className="saved-post-content">
                        <div 
                            className="post-content-avatar"
                            onMouseOver={()=>setTooltipStatus(true)}
                            onMouseOut={()=>setTooltipStatus(false)}
                        >
                            <img src={savePosts[0].user.avatar || UserAvatarImg} alt="" />
                            <ToolTip 
                                content={savePosts[0].user.username}
                                status={tooltipStatus} 
                                colorClass='--second-color'
                            />
                        </div>
                        <div className="post-content-text">
                            {savePosts[0].content}
                        </div>
                        {
                            savePosts[0].images.length > 0 ?
                            <div className="post-content-img">
                                <img src={savePosts[0].images[0].url} alt="" />
                            </div> : null
                        }
                    </Link> : 
                    <div className="saved-post-content--empty">
                        <img src={NoDataImg} alt="" />
                        <span>
                            No saved posts
                        </span>
                    </div>
                :   <div className="saved-post-content--loading">
                        <img src={LoadingImg} alt=""/>
                    </div>
            }
        </div>
    );
}

export default SavedPost;