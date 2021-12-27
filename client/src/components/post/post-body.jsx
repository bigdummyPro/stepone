import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import AudioBox from '../audio-box/audio-box';
import ImgVideoBox from '../img-video-box/img-video-box';

function PostBody({content, images, videos, audios, createdAt, user}) {
    const dispatch = useDispatch();
    const [readMoreStatus, setReadMoreStatus] = useState(false);

    const {mediaShowModal} = useSelector(state => state.modalReducer);

    const handleMediaModal = () => {
        dispatch({type: GLOBALTYPES.MEDIA_SHOW_MODAL, payload: {
            status: true,
            data: {
                content,
                images,
                videos,
                createdAt,
                user
            }
        }})
    }

    useEffect(()=>{
        if(mediaShowModal.status)
        document.getElementsByClassName('menu-post-wrapper')[0].style.zIndex = '19';
        else document.getElementsByClassName('menu-post-wrapper')[0].removeAttribute('style');
    },[mediaShowModal.status])
    
    return (
        <div className="post-item__body">
            <div className="post-body-text">
                <div className="post-body-text__content">
                    {
                        content.length < 300 ?
                        content :
                            readMoreStatus ? 
                                content + '' :
                                content.slice(0, 300) + '.....' 
                    }
                </div>
                {
                    content.length > 300 &&
                    <span 
                        className="post-body-text__more"
                        onClick={()=>setReadMoreStatus(!readMoreStatus)}
                    >
                        {readMoreStatus ? 'Hide' : 'See more'}
                    </span>
                }
            </div>
            {
                images.length > 0 || videos.length > 0 ?
                    <div 
                        className="post-body-img"
                        onClick={handleMediaModal}
                    >
                        <ImgVideoBox 
                            boxItemList={[...images, ...videos]}
                            images={images}
                            videos={videos}
                        />
                    </div> : null
            }
            {
                audios.length > 0 ?
                    <div className="post-body-audio">
                        <AudioBox 
                            audioList={audios}
                        />
                    </div> : null
            }
        </div>
    );
}

export default PostBody;