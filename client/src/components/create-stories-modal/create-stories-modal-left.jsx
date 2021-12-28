import React, { useEffect, useState } from 'react';
import storiesBackgroundList from '../../assets/json-data/stories-background.json';

function CreateStoriesModalLeft({handleBgInput, handleTextInput}) {
    const [textInput, setTextInput] = useState('');
    const [backgroundInputCurr, setBackgroundInputCurr] = useState(0);

    const handleChangeTextarea = (e) => {console.log('tt')
        if(e.target.value.length <= 320) setTextInput(e.target.value);
        else {console.log(e.target.value.length)
            setTextInput(e.target.value.slice(0, 320));
        }
    }
    useEffect(()=>{
        handleBgInput(storiesBackgroundList[backgroundInputCurr].bigBackgroundImg)
    },[backgroundInputCurr])

    useEffect(()=>{
        if(textInput.length < 320) handleTextInput(textInput);
    },[textInput])
    return (
        <div className="create-stories-modal__left">
            <div className="stories-modal-left-header">
                <span className="header-title">
                    Create Stories
                </span>
                <span className="header-tool">
                    <i className="fas fa-cog"></i>
                </span>
            </div>
            <div className="stories-modal-left-body">
                <div className="body-text-input">
                    <div className="body-text-input__title">
                        <span>
                            Document
                        </span>
                        <span>
                            {textInput ? textInput.length : '0'} / 320
                        </span>
                    </div>
                    <textarea 
                        placeholder="Input here..."
                        value={textInput}
                        onChange={(e)=>handleChangeTextarea(e)}
                    ></textarea>
                </div>
                <div className="body-style-input">
                    <div className="body-style-input__toggle">
                        <span>Aa</span>
                        <span>Font Style</span>
                    </div>
                    <div className="body-style-input__menu">
                        <div className="style-input-item">
                            Neat
                        </div>
                        <div className="style-input-item">
                            Normal
                        </div>
                        <div className="style-input-item">
                            Simple
                        </div>
                        <div className="style-input-item">
                            Style
                        </div>
                    </div>
                </div>
                <div className="body-background-input">
                    <label>Background</label>
                    <div className="background-input-list">
                        {
                            storiesBackgroundList.map((stBaLi, index) => (
                                <div 
                                    className="background-input-item"
                                    key={index}
                                    onClick={()=>setBackgroundInputCurr(index)}
                                >
                                    <img src={stBaLi.smallBackgroundImg} alt="" />
                                    {
                                        backgroundInputCurr === index ?
                                        <span>
                                            <i className="fas fa-check"></i>
                                        </span> : null
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="stories-modal-left-footer">
                <span className="modal-reset-btn">
                    Reset
                </span>
                <span className="modal-done-btn">
                    Done
                </span>
            </div>
        </div>
    );
}

export default CreateStoriesModalLeft;