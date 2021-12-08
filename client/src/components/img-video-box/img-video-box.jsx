import React from 'react';
import VideoBox from '../video-box/video-box';
import './img-video-box.scss';

function ImgVideoBox({boxItemList, images, videos}) {
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
                    images.length > 0 ? 
                        images.map((image, index)=>(
                            <div
                                className="box-item"
                                key={index}
                            >
                                <img src={image.url} alt="" />
                            </div>
                        )) : null
                }
                {
                    videos.length > 0 ?
                        videos.map((video, index) => (
                            <div 
                                className="box-item box-item-video"
                                key={index}
                            >
                                <VideoBox 
                                    video={video}
                                />
                            </div>
                        )) : null
                }
            </div>
        </div>
    );
}

export default ImgVideoBox;