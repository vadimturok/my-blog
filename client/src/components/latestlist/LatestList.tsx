import React, { FC } from "react";
import "./latest.scss";
import { useAppSelector } from "../../hooks";
import { formatTime } from "../../helpers";
import {Link, useNavigate} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "../common/button/Button";

const LatestList: FC = () => {
  const { todayPosts } = useAppSelector((state) => state.posts);
    const navigate = useNavigate()

  return (
      <div className={'latestWrapper'}>
          <div className={'createNewPostBtn'}>
              <Button
                  text={'Create post'}
                  type={'button'}
                  handleClick={() => navigate('/create')}
              />
          </div>
          <div className={"latestList"}>
              <div className={"latestTitle"}>
                  <h3>Latest</h3>
              </div>
              <div className={"latestItems"}>
                  <ul>
                      {todayPosts.length > 0 &&
                          todayPosts.map((post) => (
                              <li key={post.id}>
                                  <span>{formatTime(post.dateAndTimePublish)}</span>
                                  <Link to={`/posts/${post.id}`} className={"latestLink"}>
                                      <h5>{post.title}</h5>
                                  </Link>
                                  <div className="latestPostReactions">
                                      <div className="latestPostReactionItem">
                                          <FavoriteBorderIcon className="latestPostReactionIconLike" />
                                          <span>{post.userLikes.length}</span>
                                      </div>
                                  </div>
                              </li>
                          ))}
                  </ul>
              </div>
          </div>
      </div>
  );
};

export default LatestList;
