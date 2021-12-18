import React, { useEffect, useState } from 'react';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import EmptyDataImg from '../../assets/images/no-data.png';
import LoadingImg from '../../assets/images/loading.gif';
import { getDataAPI } from '../../utils/fetch-data-api';
import { useDispatch, useSelector } from 'react-redux';
import { imageUpload } from '../../utils/image-upload';
import { createConversation } from '../../redux/actions/messageAction';

function SettingGroupModal({handleModal}) {
    const [searchValue, setSearchValue] = useState('');
    const [searchModalStatus, setSearchModalStatus] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const [memberList, setMemberList] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [avatar, setAvatar] = useState();
    const [submitLoading, setSubmitLoading] = useState(false);


    const authState = useSelector(state => state.authReducer);
    const socketState = useSelector(state => state.socketReducer);
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        if(!e.target.value.match(/\n/)) setSearchValue(e.target.value);
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        let error = '';

        if(file.size > 1024 * 1024 * 5) return error = 'The image largest is 5mb';
        if(file.type !== 'image/png' && file.type !== 'image/jpeg') return error = 'The Image is not correct format';

        setAvatar(file);
        //Reset input//
        // e.target.value = null;
    }

    const handleSubmitWithKey = (e) => {
        if(e.key === 'Enter' && searchValue.trim() !== ''){
            handleSearchSubmit();
        }
    }
    const handleSearchSubmit = async () => {
        if(searchValue.trim() !== '')
            try {
                setSearchLoading(true);
                const res = await getDataAPI(`user/search?username=${searchValue}`);
                if(res.data.success){
                    setSearchValue('');
                    setSearchResult(res.data.users.filter(user => user._id !== authState.user._id && authState.user.following.find(item => item._id === user._id) && (memberList.length > 0 ? memberList.every(item => item._id !== user._id): true)));
                    setSearchLoading(false);
                }
            } catch (error) {
                setSearchResult([]);
                console.log(error.message)
            }
    }

    const handleAddMember = (member) => {
        if(!memberList.find(item => item._id === member._id)){
            setMemberList([...memberList, member]);
        }
    }
    const handleRemoveMember = (id) => {
        let newMemberList = [...memberList].filter(item => item._id !== id);
        //chú ý mảng sau khi filter sẽ không lưu lại giá trị, vì vậy cần tạo biến để chứa giá trị đó.
        setMemberList(newMemberList);
    }
    const handleSubmitAll = async () => {
        setSubmitLoading(true);

        let newAvatar = [];
        if(avatar.type) newAvatar = await imageUpload([avatar]);

        const newMemberList = [];
        [authState.user,...memberList].forEach(item => newMemberList.push(item._id));

        const conversation = {
            convName: groupName,
            convAvatar: newAvatar.length > 0 ? newAvatar[0].url : '',
            recipients: newMemberList
        }
        console.log(conversation)
        const res = await dispatch(createConversation({conversation, auth: authState, socket: socketState}));

        if(res.data.success){
            setSubmitLoading(false);
            handleModal(false);
        }
    }
    return (
        <div className="setting-group-modal-wrapper">
            <div className="setting-group-modal">
                <div className="setting-group-modal__header">
                    <span>Create group chat</span>
                    <span onClick={()=>handleModal(false)}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="setting-group-modal__body">
                    <div className="setting-group-item">
                        <label htmlFor="">Avatar:</label>
                        <div className="setting-avatar">
                            <div className="group-avatar">
                                <img src={(avatar && URL.createObjectURL(avatar)) || UserAvatarImg} alt="" />
                            </div>
                            <div className="avatar-tool">
                                <span>
                                    <i className="far fa-edit"></i>
                                    Change
                                </span>
                                <input type="file" onChange={handleFileChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="setting-group-item">
                        <label htmlFor="">Group name:</label>
                        <div className="setting-group-name">
                            <input 
                                type="text" 
                                value={groupName}
                                onChange={(e)=>setGroupName(e.target.value)}    
                            />
                        </div>
                    </div>
                    <div className="setting-group-item">
                        <label htmlFor="">Members:</label>
                        <div className="setting-member">
                            {
                                memberList.length > 0 ?
                                <div className="member-list">
                                    {
                                        memberList.map((meLi, index) => (
                                            <div 
                                                className="member-item"
                                                key={index}
                                            >
                                                <span>{meLi.username}</span>
                                                <span onClick={()=>handleRemoveMember(meLi._id)}>
                                                    <i className="fas fa-times"></i>
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div> : null
                            }
                            <div className="member-search">
                                <div 
                                    className="member-search__input"
                                    onClick={()=>setSearchModalStatus(true)}
                                >
                                    <input 
                                        type="text" 
                                        placeholder="Search in here"
                                        value={searchValue}
                                        onChange={handleSearchChange}
                                        onKeyDown={handleSubmitWithKey}
                                    />
                                    <span onClick={handleSearchSubmit}>
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                                {
                                    searchModalStatus ?
                                    <div className="member-search__modal">
                                        <div className="close-btn">
                                            <span onClick={()=>setSearchModalStatus(false)}>Close</span>
                                        </div>
                                        {
                                            searchLoading ? 
                                            <div className="member-search-loading">
                                                <img src={LoadingImg} alt="" />
                                            </div> :
                                            searchResult.length > 0 ?
                                            <ul className="member-search-list">
                                                {
                                                    searchResult.map((seRe, index) => (
                                                        <li 
                                                        className="member-search-item"
                                                        key={index}
                                                        onClick={()=>handleAddMember(seRe)}
                                                        >
                                                            <img src={seRe.useravatar || UserAvatarImg} alt="" />
                                                            <span>{seRe.username}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul> :
                                            <div className="member-search-empty">
                                                <img src={EmptyDataImg} alt="" />
                                                <span>No results</span>
                                            </div>
                                        }
                                    </div> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="setting-group-modal__footer">
                    <button 
                        className="btn btn--primary btn--medium-size btn--radius-5px"
                        onClick={handleSubmitAll}
                    >
                        Done
                    </button>
                </div>
                {
                    submitLoading ?
                    <div className="setting-group-modal__loading">
                        <img src={LoadingImg} alt="" />
                    </div> : null
                }
            </div>
        </div>
    );
}

export default SettingGroupModal;