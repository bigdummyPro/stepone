import React, { useState } from 'react';
import CreateStoriesModalLeft from './create-stories-modal-left';
import CreateStoriesModalRight from './create-stories-modal-right';
import './create-stories-modal.scss';

function CreateStoriesModal() {
    const [bgInputActive, setBgInputActive] = useState('');
    const [textInputActive, setTextInputActive] = useState('');
    return (
        <div className="create-stories-modal-wrapper">
            <div className="create-stories-modal">
                <CreateStoriesModalLeft 
                    handleBgInput={(value)=>setBgInputActive(value)}
                    handleTextInput={(value)=>setTextInputActive(value)}
                />
                <CreateStoriesModalRight 
                    bgInputActive={bgInputActive}
                    textInputActive={textInputActive}
                />
            </div>
        </div>
    );
}

export default CreateStoriesModal;