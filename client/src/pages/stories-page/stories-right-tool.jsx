import React, { useEffect, useState } from 'react';
import { deleteStories } from '../../redux/actions/storiesAction';

function StoriesRightTool({
    togglePlayStatus, 
    dispatch, 
    isAuth, 
    storiesID,
    handleDeleteStatus
}) {
    const [toggleStatus, setToggleStatus] = useState(true);
    const [deleteMenuStatus, setDeleteMenuStatus] = useState(false);

    const handlePlayPause = () => {
        setToggleStatus(!toggleStatus);
        togglePlayStatus.current = !togglePlayStatus.current;
    }
    const handleDelete = async () => {
        handleDeleteStatus();
        await dispatch(deleteStories({id: storiesID}));
        setDeleteMenuStatus(false);
    }
    useEffect(()=>{
        setToggleStatus(togglePlayStatus.current)
    },[togglePlayStatus.current])
    return (
        <div className="description-tool">
            <div 
                className="desciption-tool-item description-tool__play"
                onClick={handlePlayPause}
            >
                {
                    togglePlayStatus.current ?
                    <span><i className="fas fa-pause"></i></span> : 
                    <span><i className="fas fa-play"></i></span> 
                }
            </div>
            <div className="desciption-tool-item description-tool__more">
                <span 
                    className="tool-more-icon"
                    onClick={()=>setDeleteMenuStatus(!deleteMenuStatus)}
                >
                    <i className="fas fa-ellipsis-h"></i>
                </span>
                <ul className={`tool-more-menu ${deleteMenuStatus ? '--active' : ''}`}>
                    {
                        isAuth ?
                        <li 
                            className="tool-more-item"
                            onClick={handleDelete}    
                        >
                            Delete
                        </li> :
                        <li className="tool-more-item">
                            Report
                        </li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default StoriesRightTool;