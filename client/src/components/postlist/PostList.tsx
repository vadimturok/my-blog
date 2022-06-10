import React, {FC, useEffect, useState} from "react";
import "./postlist.scss";
import PostItem from "./postitem/PostItem";
import { useDispatch } from "react-redux";
import {setFetchedAll, setPosts} from "../../store/reducers/post/action-creators";
import PostService from "../../services/post-service";
import {useAppSelector} from "../../hooks";

const PostList: FC = () => {
  const {posts, fetchedAllPosts} = useAppSelector(state => state.posts)
  const [page, setPage] = useState(2)
  const [fetching, setFetching] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if(fetching && !fetchedAllPosts){
      try{
        PostService.getAllByQuery(page, 4).then(response => {
          if(response.data.items.length === 0){
            dispatch(setFetchedAll(true))
          }else{
            dispatch(setPosts([...posts, ...response.data.items]))
            setPage(prev => prev + 1)
          }
        }).finally(() => setFetching(false))
      }catch(e: any){
        console.log(e)
      }
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
      return function(){
        document.removeEventListener('scroll', scrollHandler)
      }
  }, [])

  const scrollHandler = async (e: any) => {
    if ((window.innerHeight + document.documentElement.scrollTop) >= document.body.offsetHeight) {
      setFetching(true)
    }
  }

  return (
    <div className={"postList"}>
      {
        posts?.length > 0 && posts.map((post, index) => (
            <PostItem
                key={post.id}
                displayImage={index === 0}
                post={post}
            />
        ))
      }
    </div>
  );
};

export default PostList;
