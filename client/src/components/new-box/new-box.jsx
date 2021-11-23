import React from 'react';
import './new-box.scss';
import PostImg from '../../assets/images/post-image.jpg';

function NewBox(props) {
    return (
        <div className="new-box-wrapper">
            <div className="new-box">
                <div className="new-box-list">
                    <div className="new-box-item new-host">
                        <div className="new-host__avatar">
                            <img src={PostImg} alt="" />
                        </div>
                        <div className="new-host__create">
                            <span className="new-create-icon">
                                <i className="fas fa-plus"></i>
                            </span>
                            <div className="new-create-text">
                                Create News
                            </div>
                        </div>
                    </div>
                    {/* <div className="new-box-item">
                        <img src={PostImg} alt="" />
                        <span className="new-box-item__avatar">
                            <img src={PostImg} alt="" />
                        </span>
                        <span className="new-box-item__name">
                            Nguyễn Hoàng Khánh Ngân
                        </span>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default NewBox;