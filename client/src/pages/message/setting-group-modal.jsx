import React from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';

function SettingGroupModal(props) {
    return (
        <div className="setting-group-modal-wrapper">
            <div className="setting-group-modal">
                <div className="setting-group-modal__header">
                    <span>Create group chat</span>
                    <span><i class="fas fa-times"></i></span>
                </div>
                <div className="setting-group-modal__body">
                    <div className="setting-group-item">
                        <label htmlFor="">Avatar:</label>
                        <div className="setting-avatar">
                            <div className="group-avatar">
                                <img src={UserAvatarImg} alt="" />
                            </div>
                            <div className="avatar-tool">
                                <span>
                                    <i className="far fa-edit"></i>
                                    Change
                                </span>
                                <input type="file"/>
                            </div>
                        </div>
                    </div>
                    <div className="setting-group-item">
                        <label htmlFor="">Group name:</label>
                        <div className="setting-group-name">
                            <input type="text" name=""/>
                        </div>
                    </div>
                    <div className="setting-group-item">
                        <label htmlFor="">Members:</label>
                        <div className="setting-member">
                            <div className="member-list">
                                <div className="member-item">
                                    <span>Nguyễn Hoàng Khánh Ngân</span>
                                    <span><i class="fas fa-times"></i></span>
                                </div>
                                <div className="member-item">
                                    <span>Phan Thành Minh</span>
                                    <span><i class="fas fa-times"></i></span>
                                </div>
                            </div>
                            <div className="member-input">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingGroupModal;