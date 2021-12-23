import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { getDataAPI } from '../../utils/fetch-data-api';
import Post from '../../components/post/post';
import LoadingImg from '../../assets/images/loading.gif';
import NoDataImg from '../../assets/images/no-data.png';

function ProfileBodySaved({auth, socket, dispatch}) {
    const {search} = useLocation();

    const [data, setData] = useState(null);

    useEffect(()=>{
        getDataAPI('getSavePosts')
        .then(res => {
            const newRes = [];
            auth.user.savedPosts.forEach(item => {
                res.data.savePosts.forEach(saPo => {
                    if(saPo._id === item) newRes.push(saPo)
                })
            })
            if(search){
                const searchQuery = Object.fromEntries(new URLSearchParams(search.substring(1)));
                
                setData(newRes.reverse().filter(item => item._id === searchQuery.id))
            }else{
                setData(newRes.reverse());
            }
        })
        .catch(err => console.log(err.message));
    },[auth.user.savedPosts, search])

    return (
        <div className="profile-body-saved">
            <div className="profile-body-tool">
                {
                    data && data.length > 0 && search ?
                    <div className="profile-body-see-all">
                        <Link to={`/profile/${auth.user._id}/saved`} className="btn btn--primary btn--radius-5px follow-btn">See All</Link>
                    </div> : null
                }
            </div>
            <div className="profile-body-saved-wrapper">
                {
                    data ? 
                        data.length > 0 ?
                            <div className="profile-post-container">
                                {
                                    data.map((da, index) => (
                                        <Post 
                                            key={index}
                                            post={da}
                                            auth={auth}
                                            dispatch={dispatch}
                                            socket={socket}
                                        />
                                    )) 
                                }   
                            </div>
                        : <div className="profile-saved-empty">
                                <img src={NoDataImg} alt=""/>
                                <span>No saved posts</span>
                            </div>
                    :
                    <div className="profile-saved-loading">
                        <img src={LoadingImg} alt=""/>
                    </div>
                }
            </div>
        </div>
    );
}

export default ProfileBodySaved;