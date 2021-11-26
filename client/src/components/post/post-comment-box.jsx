import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GirlImg from '../../assets/images/girl.png';
import CommentCreateBox from './comment-create-box';

function PostCommentBox({commentFocusStatus}) {
    const [hashtagLv2, setHashTagLv2] = useState({status: false, content: ''});
    const [hashtagLv3, setHashTagLv3] = useState({status: false, content: ''});
    return (
        <div className="post-item__comment-box">
            <div className="comment-box-list">
                <div className="comment-box-item comment-box-lv1-list">
                    <div className="comment-box-item--style comment-box-item__lv1">
                        <div className="comment-box-line"></div>
                        <a href="#vv" className="comment-box-avatar">
                            <img src={GirlImg} alt="" />
                        </a>
                        <div className="comment-box-body">
                            <div className="comment-box-body__content">
                                <span className="comment-content-name">
                                    Nguyễn Hoàng Khánh Ngân
                                </span>
                                <span className="comment-content-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis, porro quaerat, exercitationem dolorem id voluptate accusamus nostrum atque facere necessitatibus dolor qui. Itaque, labore iusto.
                                </span>
                            </div>
                            <div className="comment-box-body__tool">
                                <span className="comment-tool comment-tool-like">
                                    Like
                                </span>
                                <span 
                                    className="comment-tool comment-tool-reply"
                                    onClick={()=>setHashTagLv2({status: !hashtagLv2.status, content: '@Ngan'})}
                                >
                                    Reply
                                </span>
                                <span className="comment-tool comment-tool-time">
                                    3 hours ago
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="comment-box-item comment-box-item__child comment-box-lv2-list">
                        <div className="comment-box-lv2-item">
                            <div className="comment-box-curve"></div>
                            <div className="comment-box-line"></div>
                            <div className="comment-box-item--style comment-box-item__lv2">
                                <div className="comment-box-line"></div>
                                <a href="#vv" className="comment-box-avatar">
                                    <img src={GirlImg} alt="" />
                                </a>
                                <div className="comment-box-body">
                                    <div className="comment-box-body__content">
                                        <span className="comment-content-name">
                                            Nguyễn Hoàng Khánh Ngân
                                        </span>
                                        <span className="comment-content-text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis.
                                        </span>
                                    </div>
                                    <div className="comment-box-body__tool">
                                        <span className="comment-tool comment-tool-like">
                                            Like
                                        </span>
                                        <span 
                                            className="comment-tool comment-tool-reply"
                                            onClick={()=>setHashTagLv3({status: !hashtagLv2.status, content: '@Ngan'})}
                                        >
                                            Reply
                                        </span>
                                        <span className="comment-tool comment-tool-time">
                                            3 hours ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-box-item comment-box-item__child comment-box-lv3-list">
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-line"></div>
                                    <div className="comment-box-curve"></div>
                                    <div className="comment-box-item--style comment-box-item__lv3">
                                        <div className="comment-box-curve"></div>
                                        <a href="#vv" className="comment-box-avatar">
                                            <img src={GirlImg} alt="" />
                                        </a>
                                        <div className="comment-box-body">
                                            <div className="comment-box-body__content">
                                                <span className="comment-content-name">
                                                    Nguyễn Hoàng Khánh Ngân
                                                </span>
                                                <span className="comment-content-text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis.
                                                </span>
                                            </div>
                                            <div className="comment-box-body__tool">
                                                <span className="comment-tool comment-tool-like">
                                                    Like
                                                </span>
                                                <span 
                                                    className="comment-tool comment-tool-reply"
                                                    onClick={()=>setHashTagLv3({status: !hashtagLv3.status, content: '@Ngan'})}
                                                >
                                                    Reply
                                                </span>
                                                <span className="comment-tool comment-tool-time">
                                                    3 hours ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-line"></div>
                                    <div className="comment-box-curve"></div>
                                    <div className="comment-box-item--style comment-box-item__lv3">
                                        <div className="comment-box-curve"></div>
                                        <a href="#vv" className="comment-box-avatar">
                                            <img src={GirlImg} alt="" />
                                        </a>
                                        <div className="comment-box-body">
                                            <div className="comment-box-body__content">
                                                <span className="comment-content-name">
                                                    Nguyễn Hoàng Khánh Ngân
                                                </span>
                                                <span className="comment-content-text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis, porro quaerat, exercitationem dolorem id voluptate accusamus nostrum atque facere necessitatibus dolor qui. Itaque, labore iusto.
                                                </span>
                                            </div>
                                            <div className="comment-box-body__tool">
                                                <span className="comment-tool comment-tool-like">
                                                    Like
                                                </span>
                                                <span 
                                                    className="comment-tool comment-tool-reply"
                                                    onClick={()=>setHashTagLv3({status: !hashtagLv3.status, content: '@Ngan'})}
                                                >
                                                    Reply
                                                </span>
                                                <span className="comment-tool comment-tool-time">
                                                    3 hours ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-curve"></div>
                                    <CommentCreateBox 
                                        commentFocusStatus={commentFocusStatus}
                                        boxType="small"
                                        hashtagLv3={hashtagLv3}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="comment-box-lv2-item">
                            <div className="comment-box-curve"></div>
                            <div className="comment-box-line"></div>
                            <div className="comment-box-item--style comment-box-item__lv2">
                                <div className="comment-box-line"></div>
                                <a href="#vv" className="comment-box-avatar">
                                    <img src={GirlImg} alt="" />
                                </a>
                                <div className="comment-box-body">
                                    <div className="comment-box-body__content">
                                        <span className="comment-content-name">
                                            Nguyễn Hoàng Khánh Ngân
                                        </span>
                                        <span className="comment-content-text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </span>
                                    </div>
                                    <div className="comment-box-body__tool">
                                        <span className="comment-tool comment-tool-like">
                                            Like
                                        </span>
                                        <span 
                                            className="comment-tool comment-tool-reply"
                                            onClick={()=>setHashTagLv3({status: !hashtagLv2.status, content: '@Ngan'})}
                                        >
                                            Reply
                                        </span>
                                        <span className="comment-tool comment-tool-time">
                                            3 hours ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-box-item comment-box-item__child comment-box-lv3-list">
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-line"></div>
                                    <div className="comment-box-curve"></div>
                                    <div className="comment-box-item--style comment-box-item__lv3">
                                        <div className="comment-box-curve"></div>
                                        <a href="#vv" className="comment-box-avatar">
                                            <img src={GirlImg} alt="" />
                                        </a>
                                        <div className="comment-box-body">
                                            <div className="comment-box-body__content">
                                                <span className="comment-content-name">
                                                    Nguyễn Hoàng Khánh Ngân
                                                </span>
                                                <span className="comment-content-text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis, porro quaerat, exercitationem dolorem id.
                                                </span>
                                            </div>
                                            <div className="comment-box-body__tool">
                                                <span className="comment-tool comment-tool-like">
                                                    Like
                                                </span>
                                                <span 
                                                    className="comment-tool comment-tool-reply"
                                                    onClick={()=>setHashTagLv3({status: !hashtagLv3.status, content: '@Ngan'})}
                                                >
                                                    Reply
                                                </span>
                                                <span className="comment-tool comment-tool-time">
                                                    3 hours ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-curve"></div>
                                    <CommentCreateBox 
                                        commentFocusStatus={commentFocusStatus}
                                        boxType="small"
                                        hashtagLv3={hashtagLv3}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="comment-box-lv2-input">
                            <div className="comment-box-curve"></div>
                            <CommentCreateBox 
                                commentFocusStatus={commentFocusStatus}
                                boxType="small"
                                hashtagLv2={hashtagLv2}
                            />
                        </div>
                    </div>
                </div>
                <div className="comment-box-item comment-box-lv1-list">
                    <div className="comment-box-item--style comment-box-item__lv1">
                        <div className="comment-box-line"></div>
                        <a href="#vv" className="comment-box-avatar">
                            <img src={GirlImg} alt="" />
                        </a>
                        <div className="comment-box-body">
                            <div className="comment-box-body__content">
                                <span className="comment-content-name">
                                    Nguyễn Hoàng Khánh Ngân
                                </span>
                                <span className="comment-content-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis, porro quaerat, exercitationem dolorem id voluptate accusamus nostrum atque facere necessitatibus dolor qui. Itaque, labore iusto.
                                </span>
                            </div>
                            <div className="comment-box-body__tool">
                                <span className="comment-tool comment-tool-like">
                                    Like
                                </span>
                                <span 
                                    className="comment-tool comment-tool-reply"
                                    onClick={()=>setHashTagLv2({status: !hashtagLv2.status, content: '@Ngan'})}
                                >
                                    Reply
                                </span>
                                <span className="comment-tool comment-tool-time">
                                    3 hours ago
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="comment-box-item comment-box-item__child comment-box-lv2-list">
                        <div className="comment-box-lv2-item">
                            <div className="comment-box-curve"></div>
                            <div className="comment-box-line"></div>
                            <div className="comment-box-item--style comment-box-item__lv2">
                                <div className="comment-box-line"></div>
                                <a href="#vv" className="comment-box-avatar">
                                    <img src={GirlImg} alt="" />
                                </a>
                                <div className="comment-box-body">
                                    <div className="comment-box-body__content">
                                        <span className="comment-content-name">
                                            Nguyễn Hoàng Khánh Ngân
                                        </span>
                                        <span className="comment-content-text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis.
                                        </span>
                                    </div>
                                    <div className="comment-box-body__tool">
                                        <span className="comment-tool comment-tool-like">
                                            Like
                                        </span>
                                        <span 
                                            className="comment-tool comment-tool-reply"
                                            onClick={()=>setHashTagLv3({status: !hashtagLv2.status, content: '@Ngan'})}
                                        >
                                            Reply
                                        </span>
                                        <span className="comment-tool comment-tool-time">
                                            3 hours ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-box-item comment-box-item__child comment-box-lv3-list">
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-line"></div>
                                    <div className="comment-box-curve"></div>
                                    <div className="comment-box-item--style comment-box-item__lv3">
                                        <div className="comment-box-curve"></div>
                                        <a href="#vv" className="comment-box-avatar">
                                            <img src={GirlImg} alt="" />
                                        </a>
                                        <div className="comment-box-body">
                                            <div className="comment-box-body__content">
                                                <span className="comment-content-name">
                                                    Nguyễn Hoàng Khánh Ngân
                                                </span>
                                                <span className="comment-content-text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis.
                                                </span>
                                            </div>
                                            <div className="comment-box-body__tool">
                                                <span className="comment-tool comment-tool-like">
                                                    Like
                                                </span>
                                                <span 
                                                    className="comment-tool comment-tool-reply"
                                                    onClick={()=>setHashTagLv3({status: !hashtagLv3.status, content: '@Ngan'})}
                                                >
                                                    Reply
                                                </span>
                                                <span className="comment-tool comment-tool-time">
                                                    3 hours ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-line"></div>
                                    <div className="comment-box-curve"></div>
                                    <div className="comment-box-item--style comment-box-item__lv3">
                                        <div className="comment-box-curve"></div>
                                        <a href="#vv" className="comment-box-avatar">
                                            <img src={GirlImg} alt="" />
                                        </a>
                                        <div className="comment-box-body">
                                            <div className="comment-box-body__content">
                                                <span className="comment-content-name">
                                                    Nguyễn Hoàng Khánh Ngân
                                                </span>
                                                <span className="comment-content-text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis, porro quaerat, exercitationem dolorem id voluptate accusamus nostrum atque facere necessitatibus dolor qui. Itaque, labore iusto.
                                                </span>
                                            </div>
                                            <div className="comment-box-body__tool">
                                                <span className="comment-tool comment-tool-like">
                                                    Like
                                                </span>
                                                <span 
                                                    className="comment-tool comment-tool-reply"
                                                    onClick={()=>setHashTagLv3({status: !hashtagLv3.status, content: '@Ngan'})}
                                                >
                                                    Reply
                                                </span>
                                                <span className="comment-tool comment-tool-time">
                                                    3 hours ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-curve"></div>
                                    <CommentCreateBox 
                                        commentFocusStatus={commentFocusStatus}
                                        boxType="small"
                                        hashtagLv3={hashtagLv3}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="comment-box-lv2-item">
                            <div className="comment-box-curve"></div>
                            <div className="comment-box-line"></div>
                            <div className="comment-box-item--style comment-box-item__lv2">
                                <div className="comment-box-line"></div>
                                <a href="#vv" className="comment-box-avatar">
                                    <img src={GirlImg} alt="" />
                                </a>
                                <div className="comment-box-body">
                                    <div className="comment-box-body__content">
                                        <span className="comment-content-name">
                                            Nguyễn Hoàng Khánh Ngân
                                        </span>
                                        <span className="comment-content-text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </span>
                                    </div>
                                    <div className="comment-box-body__tool">
                                        <span className="comment-tool comment-tool-like">
                                            Like
                                        </span>
                                        <span 
                                            className="comment-tool comment-tool-reply"
                                            onClick={()=>setHashTagLv3({status: !hashtagLv2.status, content: '@Ngan'})}
                                        >
                                            Reply
                                        </span>
                                        <span className="comment-tool comment-tool-time">
                                            3 hours ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-box-item comment-box-item__child comment-box-lv3-list">
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-line"></div>
                                    <div className="comment-box-curve"></div>
                                    <div className="comment-box-item--style comment-box-item__lv3">
                                        <div className="comment-box-curve"></div>
                                        <a href="#vv" className="comment-box-avatar">
                                            <img src={GirlImg} alt="" />
                                        </a>
                                        <div className="comment-box-body">
                                            <div className="comment-box-body__content">
                                                <span className="comment-content-name">
                                                    Nguyễn Hoàng Khánh Ngân
                                                </span>
                                                <span className="comment-content-text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam, unde corrupti voluptatum debitis, porro quaerat, exercitationem dolorem id.
                                                </span>
                                            </div>
                                            <div className="comment-box-body__tool">
                                                <span className="comment-tool comment-tool-like">
                                                    Like
                                                </span>
                                                <span 
                                                    className="comment-tool comment-tool-reply"
                                                    onClick={()=>setHashTagLv3({status: !hashtagLv3.status, content: '@Ngan'})}
                                                >
                                                    Reply
                                                </span>
                                                <span className="comment-tool comment-tool-time">
                                                    3 hours ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-box-lv3-item">
                                    <div className="comment-box-curve"></div>
                                    <CommentCreateBox 
                                        commentFocusStatus={commentFocusStatus}
                                        boxType="small"
                                        hashtagLv3={hashtagLv3}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="comment-box-lv2-input">
                            <div className="comment-box-curve"></div>
                            <CommentCreateBox 
                                commentFocusStatus={commentFocusStatus}
                                boxType="small"
                                hashtagLv2={hashtagLv2}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <CommentCreateBox 
                commentFocusStatus={commentFocusStatus}
                boxType="medium"
            />
        </div>
    );
}

export default PostCommentBox;