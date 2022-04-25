import React, {FC, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {checkAuth} from "./store/reducers/auth/action-creators";
import AppRoutes from "./components/routes/AppRoutes";
import {fetchAllPosts, fetchTodayPosts} from "./store/reducers/post/action-creators";
import {PostSortActions} from "./store/reducers/post/types";
import FallbackComponent from "./components/errorFallback/FallbackComponent";
import {ErrorBoundary} from "react-error-boundary";
import {useNavigate} from "react-router-dom";


const App: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(fetchAllPosts(PostSortActions.SORT_BY_TIME))
    dispatch(fetchTodayPosts(5))
    if(localStorage.getItem('token')){
        dispatch(checkAuth())
    }
  }, [dispatch])

  return(
      <ErrorBoundary FallbackComponent={FallbackComponent} onReset={() => navigate('/')}>
        <AppRoutes/>
      </ErrorBoundary>
  )
};

export default App;
