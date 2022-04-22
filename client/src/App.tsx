import React, {FC, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {checkAuth} from "./store/reducers/auth/action-creators";
import AppRoutes from "./components/routes/AppRoutes";
import {fetchAllPosts, fetchTodayPosts} from "./store/reducers/post/action-creators";
import {PostSortActions} from "./store/reducers/post/types";


const App: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllPosts(PostSortActions.SORT_BY_TIME))
    dispatch(fetchTodayPosts(5))
  }, [dispatch])

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
