import React from 'react'
import Avatar from '../Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Status = () => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    var myArray = [
      "Hey whats up ",
      "Whats on your mind ",
      "How are you feeling "
    ];
    var randomItem = myArray[Math.floor(Math.random()*myArray.length)];
    return (
        <div className="status my-3 d-flex">
            <Avatar src={auth.user.avatar} size="big-avatar" />
            
            <button className="statusBtn flex-fill"
            onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}>
                {auth.user.username}
            </button>
        </div>
    )
}

export default Status
