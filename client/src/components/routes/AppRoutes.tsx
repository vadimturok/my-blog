import React, { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Tags from "../../pages/tags/Tags";
import TagPosts from "../tagPosts/TagPosts";
import CheckAdminRole from "./CheckAdminRole";
import CreateTag from "../../pages/createTag/CreateTag";

const Home = lazy(() => import("../../pages/home/Home"));
const Login = lazy(() => import("../../pages/login/Login"));
const Register = lazy(() => import("../../pages/register/Register"));
const NotFound = lazy(() => import("../../pages/404/NotFound"));
const CreatePost = lazy(() => import("../../pages/createPost/CreatePost"));
const Profile = lazy(() => import("../../pages/profile/Profile"));
const Post = lazy(() => import("../../pages/post/Post"));
const About = lazy(() => import("../../pages/about/About"));
const Videos = lazy(() => import("../../pages/videos/Videos"));
const Contact = lazy(() => import("../../pages/contact/Contact"));

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"}>
        <Route index element={<Home />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register />} />
        <Route path={"posts/:postId"} element={<Post />} />
        <Route path={"about"} element={<About />} />
        <Route path={"videos"} element={<Videos />} />
        <Route path={"contact"} element={<Contact />} />
        <Route path={"tags"} element={<Tags/>}/>
        <Route path={'t/:tagId'} element={<TagPosts/>}/>
        <Route element={<RequireAuth />}>
          <Route path={"create"} element={<CreatePost />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={'edit/:postId'} element={<CreatePost/>}/>
        </Route>
        <Route element={<CheckAdminRole/>}>
          <Route path={'create-tag'} element={<CreateTag/>}/>
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
