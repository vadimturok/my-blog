import React, {FC, useState} from "react";
import "./postitem.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Link } from "react-router-dom";
import { IPost } from "../../../types/post-type";
import { formatDate } from "../../../helpers";
import LazyLoad from "react-lazyload";
import {Skeleton} from "@mui/material";

interface PostItemProps {
  post: IPost;
  displayImage?: boolean;
}

const PostItem: FC<PostItemProps> = ({ post, displayImage }) => {
  const [loadingImage, setLoadingImage] = useState(true)
  return (
    <div className={"postItem"}>
      {displayImage && (
        <img
            style={{
              display: loadingImage ? 'none' : 'unset'
            }}
          width={700}
          height={270}
          className={"postImg"}
          src={`${post.postImage}`}
          alt="postPicture"
          onLoad={() => setLoadingImage(false)}
        />
      )}
      {loadingImage && displayImage && <div className={'imgSkeleton'}/>}
      <div className={"previewInfo"}>
        <div className={"authorInfo"}>
          <LazyLoad>
            <img src={post.user.profilePicture} alt="avatar" />
          </LazyLoad>

          <div className={"authorDescription"}>
            <span className={"authorName"}>
              {post.user.firstName + " " + post.user.lastName}
            </span>
            <span className={"postDate"}>
              {formatDate(post.dateAndTimePublish)}
            </span>
          </div>
        </div>
        <Link to={`/posts/${post.id}`} className={"link"}>
          <div className={"postInfoTitle"}>
            <h2>{post.title}</h2>
          </div>
        </Link>
      </div>
      <div className={"postReactions"}>
        <div className={"postReactionsInfo"}>
          <FavoriteBorderIcon className={"postReactionsIcon"} />
          <span>{post.userLikes.length} Likes</span>
        </div>
        <div className={"postReactionsInfo"}>
          <ChatBubbleOutlineIcon className={"postReactionsIcon"} />
          <span>{post.comments.length} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
