import React, {FC, useEffect} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import NotFound from "../../pages/404/NotFound";
import RequireAuth from "./RequireAuth";
import CreatePost from "../../pages/createPost/CreatePost";
import Profile from "../../pages/profile/Profile";
import Post from "../../pages/post/Post";
import {motion} from "framer-motion";
import About from "../../pages/about/About";
import Videos from "../../pages/videos/Videos";
import Contact from "../../pages/contact/Contact";


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
                <Route path={'posts/:postId'} element={<motion.div initial={{opacity: 0}} animate={{opacity: 1}}><Post/></motion.div>}/>
                <Route path={'about'} element={<About/>}/>
                <Route path={'videos'} element={<Videos/>}/>
                <Route path={'contact'} element={<Contact/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path={'create'} element={<CreatePost/>}/>
                    <Route path={'profile'} element={<Profile/>}/>
                </Route>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;