import React from 'react';
import './img-video-box.scss';

function ImgVideoBox({boxItemList}) {
    return (
        <div className="img-video-box-wrapper">
            <div 
                className={`img-video-box 
                ${boxItemList.length === 1 ? 'box-one-item' : ''} 
                ${boxItemList.length === 2 ? 'box-two-item' : ''}
                ${boxItemList.length === 3 ? 'box-three-item' : ''}
                ${boxItemList.length === 4 ? 'box-four-item' : ''}
                ${boxItemList.length === 5 ? 'box-more-item' : ''}
                `}
            >
                {
                    boxItemList.map((poItLi, index)=>(
                        <div 
                            className="box-item"
                            key={index}
                        >
                            <img src={poItLi} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ImgVideoBox;