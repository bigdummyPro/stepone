import React from 'react';
import AudioBox from '../audio-box/audio-box';
import ImgVideoBox from '../img-video-box/img-video-box';
import Slider from '../slider/slider';
// import PostImage from './../../assets/images/post-image.jpg';

const PostImage = "https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/152038542_107987071337863_2625180579214503188_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=adexnzbEJEsAX9Cfn2G&_nc_ht=scontent.fsgn5-8.fna&oh=4d680547162b2ab2d2a871e306841191&oe=61BC7953"
const postImageList = [PostImage, PostImage, PostImage, PostImage];

function PostBody({content, images, videos, audios}) {
    return (
        <div className="post-item__body">
            <div className="post-body-text">
                {content}
            </div>
            {
                images.length > 0 || videos.length > 0 ?
                    <div className="post-body-img">
                        <ImgVideoBox 
                            // boxItemList={postImageList}
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