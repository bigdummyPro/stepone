import React from 'react';
import CreateStoriesModalLeft from './create-stories-modal-left';
import CreateStoriesModalRight from './create-stories-modal-right';
import './create-stories-modal.scss';

function CreateStoriesModal() {
    return (
        <div className="create-stories-modal-wrapper">
            <div className="create-stories-modal">
                <CreateStoriesModalLeft />
                <CreateStoriesModalRight />
            </div>
        </div>
    );
}

export default CreateStoriesModal;