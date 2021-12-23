import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import LoadingImg from '../../assets/images/loading.gif';
import { getSuggestedUsers } from '../../redux/actions/suggestionAction';
import FollowButton from '../follow-button/follow-button';

function SuggestionUser() {

    const dispatch = useDispatch();
    const suggestionState = useSelector(state => state.suggestionReducer);
    const [loading, setLoading] = useState(false);

    const handleReload = async () => {
        setLoading(true);
        await dispatch(getSuggestedUsers());
        setLoading(false)
    }
    useEffect(()=>{
        dispatch(getSuggestedUsers());
    },[dispatch])

    console.log(suggestionState.users)
    return (
        <div className="sidebar-right__suggestion-user">
            <div className="suggestion-user-title">
                <span className="text-title">
                    Suggestion For You
                </span>
                {
                    !loading ?
                    <span className="icon-title" onClick={handleReload}>
                        <i className="fas fa-sync-alt"></i>
                    </span> : null
                }
            </div>
            <ul className="suggestion-user-list">
                {
                    suggestionState.users.length > 0 ?
                    suggestionState.users.map((user, index)=>(
                        <li className="suggestion-user-item" key={index}>
                            <div className="user-item-avatar">
                                <img src={user.avatar || UserAvatarImg} alt="" />
                            </div>
                            <div className="user-item-info">
                                <Link to={`/profile/${user._id}/post`}>{user.username}</Link>
                                <span>{user.nickname}</span>
                            </div>
                            <FollowButton 
                                size="--small-size"
                                user={user}
                            />
                        </li>
                    )) : 
                    <li className="suggestion-user-item-loading">
                        <img src={LoadingImg} alt="" />
                    </li>
                }
            </ul>
            {
                suggestionState.users && suggestionState.users.length > 3 && !loading ?
                <div className="suggestion-user-see-all">
                    <Link to="/">See All</Link>
                </div> : null
            }
        </div>
    );
}

export default SuggestionUser;