import React from 'react';

function CreateStoriesModalLeft(props) {
    return (
        <div className="create-stories-modal__left">
            <div className="stories-modal-left-header">
                <span className="header-title">
                    Create Stories
                </span>
                <span className="header-tool">
                    <i className="fas fa-cog"></i>
                </span>
            </div>
            <div className="stories-modal-left-body">
                <div className="body-text-input">
                    <label className="body-text-input__title">
                        Document
                    </label>
                    <textarea placeholder="Input here..."></textarea>
                </div>
                <div className="body-style-input">
                    <div className="body-style-input__toggle">
                        <span>Aa</span>
                        <span>Font Style</span>
                    </div>
                    <div className="body-style-input__menu">
                        <div className="style-input-item">
                            Neat
                        </div>
                        <div className="style-input-item">
                            Normal
                        </div>
                        <div className="style-input-item">
                            Simple
                        </div>
                        <div className="style-input-item">
                            Style
                        </div>
                    </div>
                </div>
                <div className="body-background-input">
                    <label>Background</label>
                    <div className="background-input-list">
                        <div className="background-input-item --active">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                            <span>
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                        <div className="background-input-item">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                        </div><div className="background-input-item">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                        </div><div className="background-input-item">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                        </div><div className="background-input-item">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                        </div><div className="background-input-item">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                        </div><div className="background-input-item">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                        </div><div className="background-input-item">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                        </div><div className="background-input-item">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                        </div><div className="background-input-item">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                        </div><div className="background-input-item">
                            <img src="https://res.cloudinary.com/dmcosnuap/image/upload/v1640617269/SocialWebsite/Stories-Bg-Img/sm-bg09_zk3qjh.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="stories-modal-left-footer">
                <span className="modal-reset-btn">
                    Reset
                </span>
                <span className="modal-done-btn">
                    Done
                </span>
            </div>
        </div>
    );
}

export default CreateStoriesModalLeft;