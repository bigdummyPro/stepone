import React from 'react';
import './create-post-modal.scss';
import EmotionModal from '../emotion-modal/emotion-modal';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import CreateFileModal from '../create-file-modal/create-file-modal';

function CreatePostModal(props) {
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch({type: GLOBALTYPES.MODAL, payload: false})
    }
    return (
        <div className="create-modal-wrapper">
            <div className="create-modal">
                <div className="create-modal__top">
                    <span className="modal-top-title">Create Post</span>
                    <span 
                        className="modal-top-close"
                        onClick={closeModal}
                    >
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="create-modal__center">
                    <div className="modal-center-content">
                        <div className="modal-center-text">
                            Hello, this is a dummy text
                        </div>
                        <div className="modal-center-icon">
                            <EmotionModal />
                        </div>
                        <div className="modal-center-file">
                            <CreateFileModal />
                        </div>
                    </div>
                    <div className="modal-center-more">
                        <span className="modal-center-more__left">
                            Add to post
                        </span>
                        <div className="modal-center-more__right">
                            {/* <div className="more-right-item --special-item --green-color">
                                <EmotionModal />
                            </div> */}
                            <div className="more-right-item --green-color">
                                <span><i className="fas fa-images"></i></span>
                            </div>
                            <div className="more-right-item --orange-color">
                                <span><i className="fas fa-compact-disc"></i></span>
                            </div>
                            <div className="more-right-item --red-color">
                                <span><i className="fas fa-map-marker-alt"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-modal__bottom">
                    <button className="btn btn--primary btn--radius-5px">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;