import React from 'react';
import LocationSelectBox from './location-select-box';

const genderArr  = ['Male', 'Female'];
function ProfileEditModal(props) {
    return (
        <div className="profile-edit-modal-wrapper">
            <div className="profile-edit-modal">
                <div className="profile-edit-modal__header">
                    <span>Edit Your Profile</span>
                    <span><i class="fas fa-times"></i></span>
                </div>
                <div className="profile-edit-modal__body">
                    <form className="edit-form">
                        <div className="edit-body-group">
                            <label htmlFor="">Username:</label>
                            <input type="text" name="username"/>
                        </div>
                        <div className="edit-body-group">
                            <label htmlFor="">Nickname:</label>
                            <input type="text" name="nickname"/>
                        </div>
                        <div className="edit-body-group">
                            <label htmlFor="">Gender:</label>
                            <div className="edit-body-group-ratio">
                                {
                                    genderArr.map((gender, index) => (
                                        <div className="edit-body-group__item" key={index}>
                                            <span>
                                                <i class="far fa-circle"></i>
                                            </span>
                                            <span>
                                                {gender}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="edit-body-group">
                            <label htmlFor="">Address:</label>
                            <div className="edit-body-group-select">
                                <LocationSelectBox />
                            </div>
                        </div>
                        <div className="edit-body-group">
                            <label htmlFor="">Phone Number:</label>
                            <input type="text" name="phone"/>
                        </div>
                    </form>
                    <div className="edit-submit-btn">
                        <button type="submit" className="btn btn--primary btn--radius-5px">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileEditModal;