import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unfollow } from '../../redux/actions/profileAction';
import './follow-button.scss';

function FollowButton({size, user}) {

    const [followStatus, setFollowStatus] = useState(false);

    const authState = useSelector(state => state.authReducer);
    const profileState = useSelector(state => state.profileReducer);
    const socketState = useSelector(state => state.socketReducer);

    const dispatch = useDispatch();

    const handleFollow = async () => {
        setFollowStatus(true);
        await dispatch(follow({users: profileState.users, user, auth: authState, socket: socketState}))
    }

    const handleUnfollow = async () => {
        setFollowStatus(false);
        await dispatch(unfollow({users: profileState.users, user, auth: authState, socket: socketState}))
    }
    useEffect(()=>{
        if(authState.user.following.find(item => item._id === user._id)){
            setFollowStatus(true);
        }
        else{
            setFollowStatus(false);
        }
    },[authState.user.following, user._id])

    return (
        <div className="toggle-follow-btn">
            {
                !followStatus ?
                <div 
                className={`btn btn--primary btn--radius-5px follow-btn ${size}`}
                onClick={handleFollow}
                >
                    Follow
                </div> :
                <div 
                className={`btn btn--primary btn--radius-5px unfollow-btn ${size}`}
                onClick={handleUnfollow}
                >
                    Unfollow
                </div>
            }

        </div>
    );
}

export default FollowButton;