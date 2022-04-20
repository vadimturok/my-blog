import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "./store/reducers/auth/action-creators";
import AppRoutes from "./components/routes/AppRoutes";
import {fetchAllPosts} from "./store/reducers/post/action-creators";
import {RootState} from "./store";


const App: FC = () => {
  const {sortType} = useSelector((state: RootState) => state.posts)
  const {post} = useSelector((state: RootState) => state.currentPost)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchAllPosts(sortType))
  }, [dispatch, post])

  useEffect(() => {
    if(localStorage.getItem('token')){
        dispatch(checkAuth())
    }
  }, [dispatch])

  return (
    <AppRoutes/>
  );
};

export default App;