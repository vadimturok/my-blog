import React, {FC, useState} from "react";
import "./postitem.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {Link, useNavigate} from "react-router-dom";
import { IPost } from "../../../types/post-type";
import { formatDate } from "../../../helpers";
import LazyLoad from "react-lazyload";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useAppSelector} from "../../../hooks";
import PostService from "../../../services/post-service";
import {useDispatch} from "react-redux";
import {removePost, setPosts} from "../../../store/reducers/post/action-creators";
import {deletePost} from "../../../store/reducers/auth/action-creators";

interface PostItemProps {
  post: IPost;
  displayImage?: boolean;
}

const PostItem: FC<PostItemProps> = ({ post, displayImage }) => {
  const {user} = useAppSelector(state => state.auth)
  const [loadingImage, setLoadingImage] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleUpdate = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    navigate(`/edit/${post.id}`)
  }
  const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    try{
      await PostService.deletePost(post.id)
      dispatch(removePost(post.id))
      dispatch(deletePost(post))
    }catch(e){
      console.log(e)
    }
  }

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
          {
            user?.id === post.user.id && (
                  <div className={'postUpdateActions'}>
                    <div onClick={handleUpdate} className={'postUpdate edit'}>
                      <EditIcon className={'postUpdateIcon'}/>
                      <span>Edit</span>
                    </div>
                    <div onClick={handleDelete} className={'postUpdate delete'}>
                      <DeleteIcon className={'postUpdateIcon'}/>
                      <span>Delete</span>
                    </div>
                  </div>
              )
          }
        </div>

        <div className={"postInfoTitle"}>
          <h2>{post.title}</h2>
        </div>
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
