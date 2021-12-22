import React, { useEffect } from 'react';
import './home.scss';
import Post from '../../components/post/post';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/postAction';
import MediaShowModal from '../../components/media-show-modal/media-show-modal';

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
            <div className="main-container">
                <div className="main-body">
                    <div className="home-wrapper">
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
                        </div>  
                    </div>
                </div>
                <MediaShowModal />
            </div>
        </div>
    );
}

export default Home;