import React, {FC, useState} from "react";
import "./postitem.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {useNavigate} from "react-router-dom";
import { IPost } from "../../../types/post-type";
import { formatDate } from "../../../helpers";
import LazyLoad from "react-lazyload";
import {useAppSelector} from "../../../hooks";
import EditPostButtons from "../../editPostButtonGroup/EditPostButtons";
import TagChip from "../../tagChip/tagChip";

interface PostItemProps {
  post: IPost;
  displayImage?: boolean;
}

const PostItem: FC<PostItemProps> = ({ post, displayImage }) => {
  const {user} = useAppSelector(state => state.auth)
  const [loadingImage, setLoadingImage] = useState(true)
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/posts/${post.id}`)} className={"postItem"}>
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
        <div className={'previewInfoTop'}>
          <div className={"authorInfo"}>
            <img src={post.user.profilePicture} alt="avatar" />
            <div className={"authorDescription"}>
            <span className={"authorName"}>
              {post.user.firstName + " " + post.user.lastName}
            </span>
              <span className={"postDate"}>
              {formatDate(post.dateAndTimePublish)}
            </span>
            </div>
          </div>
          {user?.id === post.user.id && <EditPostButtons post={post}/>}
        </div>

        <div className={"postInfoTitle"}>
          <h2>{post.title}</h2>
        </div>
        <div className={'postTags'}>
          {post.tags.map((tag, i) => i <= 3 && <TagChip key={tag.id} tag={tag}/>)}
        </div>
      </div>
      <div className={'postBottom'}>
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

    </div>
  );
};

export default PostItem;

