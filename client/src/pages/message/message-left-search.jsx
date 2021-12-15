import React, { useRef, useState } from 'react';
import {useDispatch} from 'react-redux';
import { getDataAPI } from '../../utils/fetch-data-api';
import UserAvatarImg from '../../assets/images/user-avatar.png';
import EmptyDataImg from '../../assets/images/no-data.png';
import LoadingImg from '../../assets/images/loading.gif';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GLOBALTYPES } from '../../redux/constants/globalTypes';

function MessageLeftSearch({auth}) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const dispatch = useDispatch();

    const storageRef = useRef(null);
    const search_mess_toggle_ref = useRef();
    const search_mess_content_ref = useRef();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        if(e.target.value.trim() !== ''){
            try {
                if(storageRef.current) clearTimeout(storageRef.current);
    
                storageRef.current = setTimeout(async () => {
                    setSearchLoading(true);
                    const res = await getDataAPI(`user/search?username=${e.target.value}`);
                    if(res.data.success){
                        setSearchResult(res.data.users.filter(user => user._id !== auth.user._id && auth.user.following.find(item =>item._id === user._id)));
                        setSearchLoading(false);
                    }
                }, 400)
            } catch (error) {
                console.log(error)
            }
        }else{
            setSearchResult([]);
        }
    }
    
    const handleSearchItem = (value) => {
        dispatch({type: GLOBALTYPES.SET_USER_STORAGE, payload: {
            _id: value._id, 
            convType: 'personal',
            recipients: [value]
        }})
        search_mess_content_ref.current.classList.remove('--active');
    }

    useEffect(()=>{
        //Special dropdown with search
        document.addEventListener('mousedown', (e) => {
            if(search_mess_toggle_ref.current && search_mess_toggle_ref.current.contains(e.target)){
                search_mess_content_ref.current.classList.add('--active');
            }else{
                if(search_mess_content_ref.current && !search_mess_content_ref.current.contains(e.target)){
                    search_mess_content_ref.current.classList.remove('--active');
                }
            }
        })
    },[])
    return (
        <div className="message-left-search">
            <div className="search-wrapper">
                <input 
                    ref={search_mess_toggle_ref}
                    type="text" 
                    placeholder="Search in friends list"
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <span><i className="fas fa-search"></i></span>
            </div>
            <div className="search-modal" ref={search_mess_content_ref}>
                {
                    searchLoading ?
                    <div className="search-modal__loading">
                        <img src={LoadingImg} alt="" />
                    </div> :
                    searchResult.length > 0 ?
                    <ul className="search-modal__list">
                        {
                            searchResult.map((seRe, index)=>(
                                <li 
                                    className="search-item" 
                                    key={index}
                                    onClick={()=>handleSearchItem(seRe)}
                                >
                                    <Link to={`/message/${seRe._id}`}>
                                        <img src={seRe.avatar || UserAvatarImg} alt="" />
                                        <span>{seRe.username}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul> : 
                    <div className="search-modal__empty">
                        <img src={EmptyDataImg} alt="" />
                        <span>No results found</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default MessageLeftSearch;