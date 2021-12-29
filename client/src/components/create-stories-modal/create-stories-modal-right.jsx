import React from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';


function CreateStoriesModalRight({
    bgInputActive, 
    textInputActive,
    styleInputActive
}) {
    const dispatch = useDispatch();
    const handleCloseModal = () => {
        dispatch({type: GLOBALTYPES.CREATE_STORIES_MODAL_STATUS, payload: false})
    }
    return (
        <div className="create-stories-modal__right">
            <div className="stories-modal-right-header">
                <span onClick={handleCloseModal}>
                    <i className="fas fa-times"></i>
                </span>
            </div>
            <div className="stories-modal-right-body">
                <div className="body-preview-title">
                    Preview
                </div>
                <div className="body-preview-content">
                    <div className="body-preview-content__image">
                        <img src={bgInputActive} alt="" />
                        <span style={{fontFamily: styleInputActive}}>
                            {textInputActive || 'Start Typing'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateStoriesModalRight;