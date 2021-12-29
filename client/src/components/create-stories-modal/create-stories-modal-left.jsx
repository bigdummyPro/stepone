import React, { useEffect, useState } from 'react';
import storiesBackgroundList from '../../assets/json-data/stories-background.json';
import storiesStyleList from '../../assets/json-data/stories-style.json';

function CreateStoriesModalLeft({
    handleBgInput, 
    handleTextInput, 
    handleStyleInput
}) {
    const [textInput, setTextInput] = useState('');
    const [backgroundInputCurr, setBackgroundInputCurr] = useState(0);
    const [styleInputCurr, setStyleInputCurr] = useState(0);
    const [maxLengthStatus, setMaxLengthStatus] = useState(false);

    const handleChangeTextarea = (e) => {
        if(e.target.value.length <= 320) {
            setTextInput(e.target.value);
            handleTextInput(e.target.value)
        }
        else if(e.target.value.length > 320){
            setTextInput(e.target.value.slice(0, 320));
            handleTextInput(e.target.value.slice(0, 320))
            setMaxLengthStatus(true);
            setTimeout(()=>{
                setMaxLengthStatus(false)
            },2000)
        }
    }
    useEffect(()=>{
        handleBgInput(storiesBackgroundList[backgroundInputCurr].bigBackgroundImg)
    },[backgroundInputCurr])

    useEffect(()=>{
        handleStyleInput(storiesStyleList[styleInputCurr].fontFamily)
    },[styleInputCurr])
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
                    {
                        maxLengthStatus ?
                        <span 
                            className="body-text-input__mess"
                            style={{fontSize: '1.2rem', color: '#ea4335', marginTop: '5px'}}
                        >
                            Maximum length is 320 characters
                        </span> : null
                    }
                </div>
                <div className="body-style-input">
                    <div className="body-style-input__toggle">
                        <span>Aa</span>
                        <span>Font Style</span>
                    </div>
                    <div className="body-style-input__menu">
                        {
                            storiesStyleList.map((stStLi, index)=>(
                                <div 
                                    className={`style-input-item ${styleInputCurr === index ? '--active' : ''}`}
                                    key={index}
                                    onClick={()=>setStyleInputCurr(index)}
                                >
                                    {stStLi.type}
                                </div>
                            ))
                        }
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