import React, { useEffect, useRef, useState } from 'react';
import './audio-box.scss';
import DiskImg from '../../assets/images/cd.png';
import Mp3Img from '../../assets/images/mp3.png';

import au01 from '../../assets/audio/ChungTaSauNay.mp3';
import au02 from '../../assets/audio/DiuDangEmDen.mp3';
import au03 from '../../assets/audio/LoSayByeLaBye.mp3';
import au04 from '../../assets/audio/PhaiChangEmDaYeu.mp3';
import au05 from '../../assets/audio/SaiGonDauLongQua.mp3';
import convertTime from '../../utils/convert-time';

const audioList = [
    {name: 'Chúng ta của sau này', link: au01},
    {name: 'Dịu dàng em đến', link: au02},
    {name: 'Lỡ say bye là bye', link: au03},
    {name: 'Phải chăng em đã yêu', link: au04},
    {name: 'Sài Gòn đau lòng quá', link: au05}
]
function AudioBox(props) {
    const [audio, setAudio] = useState(null);
    const [audioCurrIndex, setAudioCurrIndex] = useState(0);
    const [togglePlayStatus, setTogglePlayStatus] = useState(false);
    const [progressBarPercent, setProgressBarPercent] = useState(0);
    const [volumnBarPercent, setVolumnBarPercent] = useState(50);
    const [repeatStatus, setRepeatStatus] = useState(false);
    const [randomStatus, setRandomStatus] = useState(false);
    const [volumnStatus, setVolumnStatus] = useState(false);
    const [audioDiskAnimation, setAudioDiskAnimation] = useState(null);
    const [durationTime, setDurationTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    
    const audioRef = useRef(null);
    useEffect(()=>{audioRef.current && setAudio(audioRef.current)},[audioRef])


    //Handle Event
    const handleLoadData = () => {
        togglePlayStatus && audioRef.current.play();
    }

    const handlePlayPause = () => {
        !togglePlayStatus ? audioRef.current.play() : audioRef.current.pause();
    }
    const handleNextAudio = () => {
        setTogglePlayStatus(true);
        if(randomStatus){
            randomAudio();
        }else{
            nextAudio();
        }
        scrollWhenActiveAudio();
    }
    const handlePrevAudio = () => {
        setTogglePlayStatus(true)
        if(randomStatus){
            randomAudio();
        }else{
            prevAudio();
        }
        scrollWhenActiveAudio();
    }
    const handleClickAudio = (index) => {
        setAudioCurrIndex(index);
        setTogglePlayStatus(true);
        scrollWhenActiveAudio();
    }
    const handleRepeatAudio = () => {
        setRepeatStatus(!repeatStatus);
    }
    const handleRandomAudio = () => {
        setRandomStatus(!randomStatus);
    }
    const handleVolumnAudio = () => {
        setVolumnStatus(!volumnStatus);
    }
    const handleAudioEnded = () => {
        if(repeatStatus){
            audioRef.current.play();
        }else{
            handleNextAudio();
        }
    }
    const handleUpdateProgressBar = () => {
        if (audioRef.current.duration) {
            const progressPercent = Math.floor(
              (audioRef.current.currentTime / audioRef.current.duration) * 100
            );
            setCurrentTime(Math.floor(audioRef.current.currentTime));
            setProgressBarPercent(progressPercent);
          }
    }
    const handleUpdateVolumnBar = () => {console.log('vvt')
        audioRef.current.volumn = volumnBarPercent / 100;
    }
    const handleChangeProgressBar = (e) => {
        const seekTime = (audioRef.current.duration / 100) * e.target.value;
        audioRef.current.currentTime = seekTime;
    }
    const handleChangeVolumnBar = (e) => {
        setVolumnBarPercent(e.target.value);
        audio.volumn = volumnBarPercent / 100;
    }
    const handleInitDuration = () => {
        setDurationTime(Math.floor(audioRef.current.duration));
    }
    //Method for event
    
    const scrollWhenActiveAudio = () => {
        setTimeout(() => {
            document.querySelector(".audio-item.--active").scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }, 200);
    }
    const nextAudio = () => {
        if(audioCurrIndex >= audioList.length - 1){
            setAudioCurrIndex(0);
        }else{
            setAudioCurrIndex(audioCurrIndex + 1);
        }
    }

    const prevAudio = () => {
        if(audioCurrIndex <= 0){
            setAudioCurrIndex(audioList.length - 1);
        }else{
            setAudioCurrIndex(audioCurrIndex - 1);
        }
    }
    
    const randomAudio = () => {
        let newIndex;
        do {
        newIndex = Math.floor(Math.random() * audioList.length);
        } while (newIndex === audioCurrIndex);

        setAudioCurrIndex(newIndex);
    }
    //Hooks
    useEffect(()=>{
        let audioRefEl = audioRef.current;
        audioRefEl.onplay = function(){
            setTogglePlayStatus(true);
            audioDiskAnimation && audioDiskAnimation.play();
        }
        audioRefEl.onpause = function(){
            setTogglePlayStatus(false);
            audioDiskAnimation && audioDiskAnimation.pause();
        }
        return () => {
            //clear event to prevent memory leak
            audioRefEl.onplay = function(){}
            audioRefEl.onpause = function(){}
        }
    },[audioDiskAnimation])
    useEffect(()=>{
        const audioDisk = document.querySelector('.disk-image');
        const audioDiskAnimation = audioDisk.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, //10s
            iterations: Infinity
        })
        audioDiskAnimation.pause();
        setAudioDiskAnimation(audioDiskAnimation);
    },[])
   
    return (
        <div className="audio-box-wrapper">
            <div className="audio-box">
                <div className="audio-box-dashboard">
                    <div className="audio-box__header">
                        <span>Now Playing:</span>
                        <span>{audioList[audioCurrIndex].name}</span>
                    </div>
                    <div className="audio-box__disk">
                        <div 
                            className="disk-image"
                            style={{backgroundImage: `url(${DiskImg})`}}
                        >
                        </div>
                    </div>
                    <div className="audio-box__control">
                        <div className={`audio-control__first ${volumnStatus ? '--active' : ''}`}>
                            <div 
                                className="audio-control audio-control-volumn"
                                onClick={handleVolumnAudio}
                            >
                                <i className="fas fa-volume-up"></i>
                            </div>
                            <input 
                                id="volumn"
                                type="range" 
                                step="1" 
                                min="0" 
                                max="100" 
                                value={volumnBarPercent}
                                onChange={(e)=>handleChangeVolumnBar(e)}
                            />
                        </div>
                        <div className="audio-control__second">
                            <div 
                                className={`audio-control audio-control-repeat ${repeatStatus ? '--active' : ''}`}
                                onClick={handleRepeatAudio}
                            >
                                <i className="fas fa-redo-alt"></i>
                            </div>
                            <div 
                                className="audio-control audio-control-prev"
                                onClick={handlePrevAudio}
                            >
                                <i className="fas fa-backward"></i>
                            </div>
                            <div 
                                className="audio-control audio-control-toggle-play"
                                onClick={handlePlayPause}
                            >
                                {
                                    !togglePlayStatus ?
                                        <i className="fas fa-play"></i> :
                                        <i className="fas fa-pause"></i>
                                }
                            </div>
                            <div 
                                className="audio-control audio-control-next"
                                onClick={handleNextAudio}
                            >
                                <i className="fas fa-forward"></i>
                            </div>
                            <div 
                                className={`audio-control audio-control-random ${randomStatus ? '--active' : ''}`}
                                onClick={handleRandomAudio}
                            >
                                <i className="fas fa-random"></i>
                            </div>
                        </div>
                    </div>
                    <div className="audio-box__progress">
                        <input 
                            id="progress" 
                            className="progress" 
                            type="range"  
                            step="1" 
                            min="0" 
                            max="100" 
                            value={progressBarPercent}
                            onChange={(e)=>handleChangeProgressBar(e)}
                        />
                        <div className="audio-time-line">
                            <span className="audio-time-line__current">
                                {convertTime(currentTime)}
                            </span>
                            <span className="audio-time-line__duration">
                                {convertTime(durationTime)}
                            </span>
                        </div>
                    </div>
                    <audio 
                        ref={audioRef}
                        id="audio" 
                        src={audioList[audioCurrIndex].link}
                        onLoadedData={handleLoadData}
                        onTimeUpdate={handleUpdateProgressBar}
                        onEnded={handleAudioEnded}
                        onDurationChange={handleInitDuration}
                        onVolumeChange={handleUpdateVolumnBar}
                    ></audio>
                </div>
                <div className="audio-box-play-list">
                    <div className="play-list-heading">
                        Play List:
                    </div>
                    <div className="play-list-wrapper">
                        {
                            audioList.map((item, index) => {
                                return <div 
                                            key={index}
                                            className={`audio-item ${audioCurrIndex === index ? '--active' : ''}`}
                                            onClick={()=>handleClickAudio(index)}
                                        >
                                            <div className="audio-item__img">
                                                <img src={Mp3Img} alt="" />
                                            </div>
                                            <div className="audio-item__content">
                                                <span>{item.name}</span>
                                            </div>
                                        </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioBox;