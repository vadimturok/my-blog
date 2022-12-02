import React, { FC, useEffect } from "react";
import AppRoutes from "./components/routes/AppRoutes";
import FallbackComponent from "./components/errorFallback/FallbackComponent";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import {useAppDispatch} from "./hooks";
import {authArgs, authorizeUser} from "./store/reducers/auth/actionCreators";
import {fetchPosts} from "./store/reducers/posts/actionCreators";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const args: authArgs = {type: 'checkAuth'}
      dispatch(authorizeUser(args));
    }
  }, [dispatch]);

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => navigate("/")}
    >
      <AppRoutes />
    </ErrorBoundary>
  );
};

export default App;
