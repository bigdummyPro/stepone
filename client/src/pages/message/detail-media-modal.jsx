import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingImg from '../../assets/images/loading.gif';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';

function DetailMediaModal() {
    const {mediaDetailModal} = useSelector(state => state.modalReducer);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch({type: GLOBALTYPES.MEDIA_DETAIL_MODAL, payload: null})
    }

    return (
        <>
            {
                mediaDetailModal && mediaDetailModal.status ?
                <div className="detail-media-modal-wrapper">
                    <span 
                        className="detail-media-modal-close"
                        onClick={handleCloseModal}
                    >
                        <i className="fas fa-times"></i>
                    </span>
                    <div className="detail-media-modal">
                        {
                            mediaDetailModal ?
                            <div className="detail-media-modal__img">
                                <img src={mediaDetailModal.data.url} alt="" />
                            </div> :
                            <div className="detail-media-modal__loading">
                                <img src={LoadingImg} alt="" />
                            </div>
                        }
                    </div>
                </div> : null
            }
        </>
    );
}

export default DetailMediaModal;