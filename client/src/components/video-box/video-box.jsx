import React, { useEffect, useRef, useState } from 'react';
import './video-box.scss';
import convertTime from '../../utils/convert-time';

function VideoBox({video}) {
    const [togglePlayStatus, setTogglePlayStatus] = useState(false);
    const [progressBarPercent, setProgressBarPercent] = useState(0);
    const [durationTime, setDurationTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const videoRef = useRef();


    const handleLoadData = () => {
        togglePlayStatus && videoRef.current.target.play();
    }
    const handleAudioEnded = () => {
        videoRef.current.play();
    }
    const handlePlayPause = () => {
        !togglePlayStatus ? videoRef.current.play() : videoRef.current.pause();
    }
    const handleInitDuration = () => {
        setDurationTime(Math.floor(videoRef.current.duration));
    }
    const handleUpdateProgressBar = () => {
        if (videoRef.current.duration) {
            const progressPercent = Math.floor(
              (videoRef.current.currentTime / videoRef.current.duration) * 100
            );
            setCurrentTime(Math.floor(videoRef.current.currentTime));
            setProgressBarPercent(progressPercent);
          }
    }
    const handleChangeProgressBar = (e) => {
        const seekTime = (videoRef.current.duration / 100) * e.target.value;
        videoRef.current.currentTime = seekTime;
    }
    useEffect(()=>{
        let videoRefEl = videoRef.current;
        videoRefEl.onplay = function(){
            setTogglePlayStatus(true);
        }
        videoRefEl.onpause = function(){
            setTogglePlayStatus(false);
        }
        return ()=>{
            //clear event to prevent memory leak
            videoRefEl.onplay = function(){}
            videoRefEl.onpause = function(){}
        }
    },[])
    return (
        <div className="video-box">
            <div className="video-box__content">
                <video 
                    src={video.url} 
                    autoPlay
                    muted
                    ref={videoRef}
                    onDurationChange={handleInitDuration}
                    onTimeUpdate={handleUpdateProgressBar}
                    onLoadedData={handleLoadData}
                    onEnded={handleAudioEnded}
                />
            </div>
            <div className="video-box__control">
                <div className="video-box-control-container">
                    <div 
                        className="video-control-item toggle-play-control btn-control"
                        onClick={handlePlayPause}
                    >
                        {
                            !togglePlayStatus ?
                                <i className="fas fa-play"></i> :
                                <i className="fas fa-pause"></i> 
                        }
                    </div>
                    <div className="video-control-item time-info">
                        <span>{convertTime(currentTime)}</span>
                        <span>/</span>
                        <span>{convertTime(durationTime)}</span>
                    </div>
                    <div className="video-control-item progress-line">
                        <input 
                            type="range" 
                            id="progress" 
                            value={progressBarPercent}
                            onChange={handleChangeProgressBar}
                        />
                    </div>
                    <div className="video-control-item setting-control btn-control">
                        <i className="fas fa-cog"></i>
                    </div>
                    <div className="video-control-item expand-control btn-control">
                        <i className="fas fa-expand-alt"></i>
                    </div>
                    <div className="video-control-item volumn-control btn-control">
                        <i className="fas fa-volume-down"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoBox;