import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { combineReducers } from 'redux';
import FilterImg from '../../assets/images/filter.png';
import Post from '../../components/post/post';

const filterList = ["Newest", "Most commented", "Most liked"];

function ProfileBodyPost({profile, detailPost, auth, socket, dispatch}) {

    const {search} = useLocation();
    const {id} = useParams();
    const [postData, setPostData] = useState([]);

    const [filterItemActive, setFilterItemActive] = useState(0);
    const [filterMenuStatus, setFilterMenuStatus] = useState(false);
    
    useEffect(()=>{
        if(detailPost.length > 0 && search){
            setPostData(detailPost)
        }else{
            const userPost = profile.posts.find(item => item._id === id);
            setPostData(userPost ? userPost.posts : []);
        }
    },[detailPost, profile, search, id])

    return (
        <div className="profile-body-post">
            <div className="profile-body-filter">
                <div className="profile-body-filter__toggle">
                     {
                        !filterMenuStatus ?
                            <div 
                                className="toggle-icon-open"
                                onClick={()=>setFilterMenuStatus(true)}
                            >
                                <img src={FilterImg} alt="" />
                                <span>Filter</span>
                            </div> :
                            <div 
                                className="toggle-icon-close"
                                onClick={()=>setFilterMenuStatus(false)}
                            >
                                <i className="fas fa-times"></i>
                                Close
                            </div>
                    }
                </div>
                <ul 
                    className={`profile-body-filter__list ${filterMenuStatus ? '--active' : ''}`}
                >
                    {
                        filterList.map((fiLi, index)=>(
                            <li  
                                className={`profile-body-filter-item ${filterItemActive === index ? '--active' : ''}`}
                                key={index}
                                onClick={()=>setFilterItemActive(index)}
                            >
                                {fiLi}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="profile-body-post-wrapper">
                <div className="profile-body-post">
                    {
                        postData.map((post, index)=>(
                            <Post 
                                key={index}
                                post={post}
                                auth={auth}
                                dispatch={dispatch}
                                socket={socket}
                            />
                        )) 
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfileBodyPost;