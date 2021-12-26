import React, { useEffect, useState } from 'react';
import { checkImage } from '../../utils/image-upload';
import LocationSelectBox from './location-select-box';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import LoadingImg from '../../assets/images/loading.gif';
import { updateUserProfile } from '../../redux/actions/profileAction';

const genderArr  = ['Male', 'Female', 'Unset'];
const initTextValue = {
    username: '',
    nickname: '',
    mobile: ''
}
function ProfileEditModal({handleEditModal, profile, auth, dispatch}) {
    const [locationValue, setLocationValue] = useState();
    const [genderValue, setGenderValue] = useState({key: 2, value: 'Unset'});
    const [textValue, setTextValue] = useState(initTextValue);
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLocationValue = (value) => {
        setLocationValue(value);
    }
    const handleChangeInput = (e) => {
        const {name, value, type} = e.target;
        setTextValue({...textValue, [name]: type === 'number' && value !== '' && value !== '0' ? Math.abs(value) : value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {ward, district, province} = locationValue;
        const locationString = `${ward ? ward : ''}${district ? `${ward ? ', ' : ''}` + district : ''}${province ? `${district ? ', ' : ''}` + province : ''}`;
        const res = await dispatch(updateUserProfile({
            userData: {...textValue, gender: genderValue.value, address: locationString ? locationString : profile.address},
            userAvatar: avatar,
            auth
        }))
        if(res.data.success){
            handleEditModal(false);
        }
    }
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];

        const err = checkImage(file);
        if(err) console.log('err');
        setAvatar(file);
    }
    useEffect(()=>{
        setTextValue({username: profile.username, nickname: profile.nickname, mobile: profile.mobile});
        setGenderValue({key: profile.gender === 'Unset' ? 2 : (profile.gender === 'Male' ? 0 : 1), value: profile.gender});
    },[profile])
    useEffect(()=>{
        return () => avatar && URL.revokeObjectURL(avatar);
    },[])
    return (
        <div className="profile-edit-modal-wrapper">
            <div className="profile-edit-modal">
                <div className="profile-edit-modal__header">
                    <span>Edit Your Profile</span>
                    <span onClick={()=>handleEditModal(false)}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="profile-edit-modal__body">
                    <form className="edit-form" onSubmit={handleSubmit}>
                        <div className="edit-body-group edit-body-group--avatar">
                            <div className="user-avatar">
                                <img src={avatar || auth.user.avatar ? (avatar ? URL.createObjectURL(avatar) : auth.user.avatar) : UserAvatarImg} alt="" />
                            </div>
                            <div className="avatar-tool">
                                <span>
                                    <i className="far fa-edit"></i>
                                    Change
                                </span>
                                <input 
                                    type="file" 
                                    name="avatar" 
                                    onChange={handleChangeAvatar}
                                />
                            </div>
                        </div>
                        <div className="edit-body-group">
                            <label htmlFor="">Username:</label>
                            <input 
                                type="text" 
                                name="username"
                                value={textValue.username || ''}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="edit-body-group">
                            <label htmlFor="">Nickname:</label>
                            <input 
                                type="text" 
                                name="nickname"
                                value={textValue.nickname || ''}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="edit-body-group">
                            <label htmlFor="">Gender:</label>
                            <div className="edit-body-group-ratio">
                                {
                                    genderArr.map((gender, index) => (
                                        <div 
                                            className="edit-body-group__item" key={index}
                                            onClick={()=>setGenderValue({key: index, value: gender})}
                                        >
                                            {
                                                genderValue.key === index ?
                                                <span>
                                                    <i className="far fa-dot-circle"></i>
                                                </span> :
                                                <span>
                                                    <i className="far fa-circle"></i>
                                                </span>
                                            }
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
                                <span className="current-address">
                                    Current address: 
                                    <p>{profile.address ? profile.address : 'Not update'}</p>
                                </span>
                                <LocationSelectBox 
                                    receiveLocationValue={(value)=>handleLocationValue(value)}
                                />
                            </div>
                        </div>
                        <div className="edit-body-group">
                            <label htmlFor="">Phone Number:</label>
                            <input 
                                type="number" 
                                name="mobile"
                                value={textValue.mobile || ''}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="edit-submit-btn">
                            <button type="submit" className="btn btn--primary btn--radius-5px">Update</button>
                        </div>
                    </form>
                </div>
                {
                    loading ?
                    <div className="profile-edit-modal__loading">
                        <img src={LoadingImg} alt="" />
                    </div> : false
                }
            </div>
        </div>
    );
}

export default ProfileEditModal;