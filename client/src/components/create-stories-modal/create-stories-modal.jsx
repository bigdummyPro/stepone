import React, { useState } from 'react';
import CreateStoriesModalLeft from './create-stories-modal-left';
import CreateStoriesModalRight from './create-stories-modal-right';
import './create-stories-modal.scss';
import LoadingImg from '../../assets/images/loading.gif';

function CreateStoriesModal() {
    const [bgInputActive, setBgInputActive] = useState('');
    const [textInputActive, setTextInputActive] = useState('');
    const [styleInputActive, setStyleInputActive] = useState('');
    const [loading, setLoading] = useState(false);
    return (
        <div className="create-stories-modal-wrapper">
            <div className="create-stories-modal">
                <CreateStoriesModalLeft 
                    handleBgInput={(value)=>setBgInputActive(value)}
                    handleTextInput={(value)=>setTextInputActive(value)}
                    handleStyleInput={(value)=>setStyleInputActive(value)}
                    handleLoading={(value)=>setLoading(value)}
                />
                <CreateStoriesModalRight 
                    bgInputActive={bgInputActive}
                    textInputActive={textInputActive}
                    styleInputActive={styleInputActive}
                />
                {
                    loading ?
                    <div className="create-stories-modal__loading">
                        <img src={LoadingImg} alt="" />
                    </div> : null
                }
            </div>
        </div>
    );
}

export default CreateStoriesModal;