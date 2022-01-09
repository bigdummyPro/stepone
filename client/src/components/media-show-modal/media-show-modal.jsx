import React, { useEffect, useState } from 'react';
import './media-show-modal.scss';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import moment from 'moment';
import { Link } from 'react-router-dom';
import VideoBox from '../video-box/video-box';

function MediaShowModal() {
    const {mediaShowModal} = useSelector(state => state.modalReducer);
    const [currSlide, setCurrSlide] = useState(0);
    const [zoom, setZoom] = useState({index: null, size: 1});

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch({type: GLOBALTYPES.MEDIA_SHOW_MODAL, payload: {
            status: false,
            content: null
        }})
        setZoom({index: null, size: 1});
        setCurrSlide(0)
    }

    const handleNextSlide = () => {
        let newCurrSlide = currSlide + 1;

        if(newCurrSlide > (mediaShowModal.data.images.length + mediaShowModal.data.videos.length) - 1) newCurrSlide = 0

        setCurrSlide(newCurrSlide);
        setZoom({index: null, size: 1});
    }

    const handlePrevSlide = () => {
        let newPrevSlide = currSlide - 1;

        if(newPrevSlide < 0) newPrevSlide = (mediaShowModal.data.images.length + mediaShowModal.data.videos.length) - 1;

        setCurrSlide(newPrevSlide);
        setZoom({index: null, size: 1});
    }

    const handleZoomIn = () => {
        if(zoom.size < 2) {
            setZoom({index: currSlide, size: zoom.size + 0.2})
        }
    }

    const handleZoomOut = () => {
        if(zoom.size > 1) {
            setZoom({index: currSlide, size: zoom.size - 0.2})
        }
    }

    const handleDragEl = (el) => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        el.onmousedown = dragMouseDown;

        function dragMouseDown(e){
            e = e || window.event;
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;

            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
    
        function elementDrag(e){
            e = e || window.event;
            e.preventDefault();

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        }
    
        function closeDragElement(){
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    useEffect(()=>{
        const dragEl = document.getElementsByClassName('media-slider-item')[currSlide];

        if(dragEl) handleDragEl(dragEl.firstChild)
    },[currSlide, mediaShowModal])
    return (
        <>
            {
                mediaShowModal.status ?
                <div className="media-show-modal-wrapper">
                    <div className="media-show-modal">
                        <div className="media-modal-left">
                            <div className="media-modal-left-container">
                                <div 
                                    className="media-modal-slider" 
                                    style={{transform: `translateX(${-currSlide * 100}%)`}}
                                >
                                    {
                                        mediaShowModal.data.videos.map((video, index) => (
                                            <div 
                                                className="media-slider-item"
                                                key={index}
                                            >
                                                <VideoBox 
                                                    video={video}
                                                    type="medium"
                                                />
                                            </div>
                                        ))}
                                    {
                                        mediaShowModal.data.images.map((image, index) => (
                                            <div 
                                                className="media-slider-item"
                                                key={index}
                                            >
                                                <div 
                                                    className="media-image-wrap"
                                                    style={zoom.index === index ?{transform: `scale(${zoom.size})`} : null}
                                                >
                                                    <img src={image.url} alt="" />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="media-modal-tool media-modal-tool__top">
                                    <div 
                                        className="tool-top-close"
                                        onClick={handleCloseModal}
                                    >
                                        <span>
                                            <i className="fas fa-times"></i>
                                        </span>
                                    </div>
                                    {
                                         currSlide > mediaShowModal.data.videos.length - 1 ?
                                        <div className="tool-top-zoom">
                                            <span 
                                                className={`zoom-in-btn ${zoom.size >= 2 ? '--non-active' : ''}`}
                                                onClick={handleZoomIn}
                                            >
                                                <i className="fas fa-search-plus"></i>
                                            </span>
                                            <span 
                                                className={`zoom-out-btn ${zoom.size <= 1 ? '--non-active' : ''}`}
                                                onClick={handleZoomOut}
                                            >
                                                <i className="fas fa-search-minus"></i>
                                            </span>
                                        </div> : null
                                    }
                                </div>
                                {
                                    mediaShowModal.data.images.length > 1 || mediaShowModal.data.videos.length > 1 ?
                                    <div className="media-modal-tool media-modal-tool__center">
                                        <span 
                                            className="prev-btn"
                                            onClick={handlePrevSlide}
                                        >
                                            <i className="fas fa-chevron-left"></i>
                                        </span>
                                        <span 
                                            className="next-btn"
                                            onClick={handleNextSlide}
                                        >
                                            <i className="fas fa-chevron-right"></i>
                                        </span>
                                    </div> : null
                                }
                            </div>
                        </div>
                        <div className="media-modal-right">
                            <div className="media-modal-info">
                                <div className="media-modal-info__user">
                                    <Link to={`/profile/${mediaShowModal.data.user._id}/post`} className="user-avatar">
                                        <img src={mediaShowModal.data.user.avatar || UserAvatarImg} alt="" />
                                    </Link>
                                    <div className="user-content">
                                        <Link to={`/profile/${mediaShowModal.data.user._id}/post`}>
                                            {mediaShowModal.data.user.username}
                                        </Link>
                                        <span>{moment(mediaShowModal.data.createdAt).fromNow()}</span>
                                    </div>
                                    <div className="post-tool">
                                        <span>
                                            <i className="fas fa-ellipsis-h"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="media-modal-info__content">
                                    {mediaShowModal.data.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null
            }
        </>
    );
}

export default MediaShowModal;