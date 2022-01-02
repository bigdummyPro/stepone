import React, {useEffect, useRef, useState} from 'react';

function ProgressTimeOut({stories, currIndex, status, togglePlayStatus}) {
    const [currValue, setCurrValue] = useState(0);

    const storageTimeOutRef = useRef(null);
    useEffect(()=>{
        clearInterval(storageTimeOutRef.current);
        setCurrValue(0);

        storageTimeOutRef.current = setInterval(()=>{
            let newValue = 0; 
            if(togglePlayStatus.current){
                setCurrValue(prevValue => {
                    newValue = prevValue + 1;
                    // console.log(newValue)
                    if(newValue >= 100){
                        clearInterval(storageTimeOutRef.current);
                        newValue = 100;
                    }
                    return newValue;
                })
            }
        }, 60)

        return () => {
            clearInterval(storageTimeOutRef.current);
            setCurrValue(0);
        }
    },[togglePlayStatus, status, currIndex])
    return (
        <div className="stories-right-progress-list">
            {
                stories && stories.map((story, index) => (
                    <div 
                        className="stories-right-progress-item"
                        key={index}
                    >
                        <div 
                            className="progress-bar"
                            style={{width: 
                                currIndex === index ? 
                                `${currValue}%` :
                                index > currIndex ?
                                `0%` : `100%`
                            }}    
                        ></div>
                    </div>
                ))
            }
        </div>
    );
}

export default ProgressTimeOut;