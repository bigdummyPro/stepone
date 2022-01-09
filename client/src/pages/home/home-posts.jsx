import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, loadMorePosts } from '../../redux/actions/postAction';
import NoDataImg from '../../assets/images/no-data.png';
import LoadingImg from '../../assets/images/loading.gif';
import Post from '../../components/post/post';

function HomePost(props) {
    const dispatch = useDispatch();
    const postState = useSelector(state => state.postReducer);
    const authState = useSelector(state => state.authReducer);
    const socketState = useSelector(state => state.socketReducer);

    const [posts, setPosts] = useState([]);
    const [result, setResult] = useState(2);
    const [page, setPage] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(1);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);

    useEffect(()=>{
        dispatch(getPosts());
    },[])
    useEffect(()=>{
        if(postState.posts.length > 0){
            setPosts(postState.posts);
            setResult(postState.result);
            setPage(postState.page);
        }
    },[postState])
    
    //Load more
    const observerRef = useRef();

    const lastElementRef = useCallback(node => {
        if(observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setIsLoadMore(count => count + 1)
            }
        },{
            threshold: .5
        })
        if(node) observerRef.current.observe(node);
    },[])

    useEffect(()=>{
        const getPosts = async () => {
            const res = await dispatch(loadMorePosts({page: page + 1}));

            setIsLoadMore(1);
            if(res.data.success) setLoadMoreLoading(false);
        }
        if(isLoadMore > 1){
            if(result >= page * 2){
                setLoadMoreLoading(true);
                getPosts();
            }
        }
    },[isLoadMore])
    return (
        <>
            {
                !postState.loading ?
                    posts.length > 0 ?
                    <div className="home-post">
                        {
                            posts.map((post, index, posts) => (
                                posts.length === index + 1 ?
                                <div 
                                    ref={lastElementRef}
                                    key={index}
                                >
                                    <Post 
                                        post={post}
                                        auth={authState}
                                        dispatch={dispatch}
                                        socket={socketState}
                                    /> 
                                </div>
                                :
                                <div key={index}>
                                    <Post 
                                        post={post}
                                        auth={authState}
                                        dispatch={dispatch}
                                        socket={socketState}
                                    />
                                </div>
                            ))
                        }
                        {
                            loadMoreLoading ?
                            <div>
                                <div className="home-post__load-more">
                                    <img src={LoadingImg} alt="" />
                                </div>
                            </div> : null
                        }
                    </div>:
                    <div className="home-post-empty">
                        <img src={NoDataImg} alt="" />
                        <span>No posts</span>
                    </div>
                : 
                <div className="home-post-loading">
                    <img src={LoadingImg} alt="" />
                </div>
            }
        </>
    );
}

export default HomePost;