import React, {FC, useEffect} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Post from "../../pages/post/Post";
import NotFound from "../../pages/404/NotFound";
import RequireAuth from "./RequireAuth";
import CreatePost from "../../pages/createPost/CreatePost";


const AppRoutes: FC = () => {
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathname])
    return (
        <Routes>
            <Route path={'/'}>
                <Route index element={<Home/>}/>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'register'} element={<Register/>}/>
                <Route path={'posts/:postId'} element={<Post/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path={'create'} element={<CreatePost/>}/>
                </Route>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;