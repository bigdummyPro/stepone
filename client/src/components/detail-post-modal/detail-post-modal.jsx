import React from 'react';
import DetailModalLeft from './detail-modal-left';
import DetailModalRight from './detail-modal-right';
import './detail-post-modal.scss';

function DetailPostModal() {
    return (
        <div className="detail-post-modal-wrapper">
            <div className="detail-post-modal">
                <DetailModalLeft />
                <DetailModalRight />
            </div>
        </div>
    );
}

export default DetailPostModal;