import React, { useEffect } from 'react';
import './home.scss';
import Post from '../../components/post/post';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/postAction';
import MediaShowModal from '../../components/media-show-modal/media-show-modal';
import NoDataImg from '../../assets/images/no-data.png';
import LoadingImg from '../../assets/images/loading.gif';
import StoriesList from '../../components/stories-list/stories-list';

function Home() {
    const dispatch = useDispatch();
    const postState = useSelector(state => state.postReducer);
    const authState = useSelector(state => state.authReducer);
    const socketState = useSelector(state => state.socketReducer);

    useEffect(()=>{
        dispatch(getPosts());
    },[])
    return (
        <div className="main-content">
            <title>Home | Connecto</title>
            <div className="main-container">
                <div className="main-body">
                    <div className="home-stories">
                        <StoriesList />
                    </div>
                    <div className="home-wrapper">
                        {
                            !postState.loading ?
                                postState.posts.length > 0 ?
                                <div className="home-post">
                                    {
                                        postState && postState.posts.map((post, index) => (
                                            <Post 
                                                key={index}
                                                post={post}
                                                auth={authState}
                                                dispatch={dispatch}
                                                socket={socketState}
                                            />
                                        ))
                                    }
                                </div> :
                                <div className="home-post-empty">
                                    <img src={NoDataImg} alt="" />
                                    <span>No posts</span>
                                </div>
                            : 
                            <div className="home-post-loading">
                                <img src={LoadingImg} alt="" />
                            </div>
                        }
                    </div>
                </div>
                <MediaShowModal />
            </div>
        </div>
    );
}

export default Home;