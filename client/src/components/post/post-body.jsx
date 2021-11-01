import React from 'react';
import PostImage from './../../assets/images/post-image.jpg';

function PostBody(props) {
    return (
        <div className="post-item__body">
            <div className="post-body-text">
                TV Neo QLED x Loa thanh Q-Series - Combo chiến game bất bại!
                Là tín đồ mê game, sao có thể bỏ qua tuyệt tác chiến game TV Neo QLED sở hữu các tính năng hỗ trợ mọi game thủ: 
                ✅ Dễ dàng chinh phục game hạng nặng với chất lượng hình ảnh 4K/120Hz cùng độ trễ đầu vào thấp cho trải nghiệm chơi game mượt mà, không giật lag. 
            </div>
            <div className="post-body-img">
                <img src={PostImage} alt="" />
            </div>
        </div>
    );
}

export default PostBody;