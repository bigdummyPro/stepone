import React from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';

function StoriesRight(props) {
    return (
        <div className="stories-right-wrapper">
            <div className="stories-right">
                <div className="stories-right__main">
                    <div className="stories-right-progress-list">
                        <div className="stories-right-progress-item">
                            <div className="progress-bar"></div>
                        </div>
                        <div className="stories-right-progress-item">
                            <div className="progress-bar"></div>
                        </div>
                        <div className="stories-right-progress-item">
                            <div className="progress-bar"></div>
                        </div>
                    </div>
                    <div className="stories-right-description">
                        <div className="description-user">
                            <img src={UserAvatarImg} alt="" />
                            <span>Nguyễn Hoàng Khánh Ngân</span>
                        </div>
                        <div className="description-tool">
                            <div className="desciption-tool-item description-tool__play">
                                <span><i className="fas fa-play"></i></span>
                                {/* <span><i className="fas fa-pause"></i></span> */}
                            </div>
                            <div className="desciption-tool-item description-tool__more">
                                <span>
                                    <i classname="fas fa-ellipsis-h"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="stories-right-body">
                        <div className="stories-right-body__img">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617273/SocialWebsite/Stories-Bg-Img/b-bg09_og8bh0.jpg" alt="" />
                        </div>
                        <span className="stories-right-body__text">
                            Hello every body
                        </span>
                    </div>
                    <div className="stories-right-footer">

                    </div>
                </div>
                <span className="stories-right__prev">
                    <i className="fas fa-chevron-left"></i>
                </span>
                <span className="stories-right__next">
                    <i className="fas fa-chevron-right"></i>
                </span>
            </div>
        </div>
    );
}

export default StoriesRight;