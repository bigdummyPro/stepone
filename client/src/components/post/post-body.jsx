import React from 'react';
import ImgVideoBox from '../img-video-box/img-video-box';
import Slider from '../slider/slider';
// import PostImage from './../../assets/images/post-image.jpg';

const PostImage = "https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/152038542_107987071337863_2625180579214503188_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=adexnzbEJEsAX9Cfn2G&_nc_ht=scontent.fsgn5-8.fna&oh=4d680547162b2ab2d2a871e306841191&oe=61BC7953"
const postImageList = [PostImage, PostImage, PostImage, PostImage, PostImage];

function PostBody(props) {
    const sliderItemRender = () => {

    }
    return (
        <div className="post-item__body">
            <div className="post-body-text">
                TV Neo QLED x Loa thanh Q-Series - Combo chiến game bất bại!
                Là tín đồ mê game, sao có thể bỏ qua tuyệt tác chiến game TV Neo QLED sở hữu các tính năng hỗ trợ mọi game thủ: 
                ✅ Dễ dàng chinh phục game hạng nặng với chất lượng hình ảnh 4K/120Hz cùng độ trễ đầu vào thấp cho trải nghiệm chơi game mượt mà, không giật lag. 
            </div>
            <div className="post-body-img">
                <ImgVideoBox 
                    boxItemList={postImageList}
                />
                {/* <img src={PostImage} alt="" /> */}
            </div>
        </div>
    );
}

export default PostBody;