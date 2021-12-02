import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import GirlImage from '../../assets/images/girl.png'
import { getSuggestedUsers } from '../../redux/actions/suggestionAction';
import FollowButton from '../follow-button/follow-button';

function SuggestionUser() {

    const dispatch = useDispatch();
    const suggestionState = useSelector(state => state.suggestionReducer);

    useEffect(()=>{
        dispatch(getSuggestedUsers());
    },[dispatch])

    return (
        <div className="sidebar-right__suggestion-user">
            <div className="suggestion-user-title">
                Suggestion For You
            </div>
            <ul className="suggestion-user-list">
                {
                    suggestionState.users &&
                    suggestionState.users.map((user, index)=>(
                        <li className="suggestion-user-item" key={index}>
                            <div className="user-item-avatar">
                                <img src={GirlImage} alt="" />
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
                    ))
                }
            </ul>
            <div className="suggestion-user-see-all">
                <a href="#vv">See All</a>
            </div>
        </div>
    );
}

export default SuggestionUser;