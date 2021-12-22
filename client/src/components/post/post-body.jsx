import React from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';
import AudioBox from '../audio-box/audio-box';
import ImgVideoBox from '../img-video-box/img-video-box';

function PostBody({content, images, videos, audios, createdAt, user}) {
    const dispatch = useDispatch();

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
    return (
        <div className="post-item__body">
            <div className="post-body-text">
                {content}
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