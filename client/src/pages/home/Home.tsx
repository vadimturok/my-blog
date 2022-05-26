import React, { FC } from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import PostList from "../../components/postlist/PostList";
import LatestList from "../../components/latestlist/LatestList";

const Home: FC = () => {
  return (
    <div className={"home"}>
      <Sidebar />
      <PostList />
      <LatestList />
    </div>
  );
};

export default Home;
