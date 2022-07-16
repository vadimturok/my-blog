import React, {FC, useEffect} from "react";
import "./home.scss";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchPosts} from "../../store/reducers/posts/actionCreators";
import Sidebar from "../../components/sidebar/Sidebar";
import PostList from "../../components/postlist/PostList";
import Loader from "../../components/loader/Loader";
import LatestList from "../../components/latestlist/LatestList";

const Home: FC = () => {
  const {isLoading, error, posts, postsType, todayPosts} = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts({type: postsType}))
  }, [dispatch])

  return (
    <div className={"home"}>
      <Sidebar homePage={true}/>
        <div className={'homePosts'}>
            {isLoading ? <Loader/> : <PostList error={error} posts={posts}/>}
        </div>
        <LatestList todayPosts={todayPosts} />
    </div>
  );
};

export default Home;
