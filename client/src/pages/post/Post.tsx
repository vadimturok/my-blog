import React, { useEffect, useState } from "react";
import "./post.scss";
import LatestList from "../../components/latestlist/LatestList";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, useParams } from "react-router-dom";
import Comment from "../../components/comment/Comment";
import CommentForm from "../../components/commentForm/CommentForm";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch } from "react-redux";
import {
  fetchPostById,
  likePost,
  setIsLiked,
} from "../../store/reducers/currentPost/action-creators";
import NotFound from "../404/NotFound";
import Loader from "../../components/loader/Loader";
import { useAppSelector, useTitle } from "../../hooks";
import { formatDate } from "../../helpers";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModalWindow from "../../components/modalWindow/ModalWindow";
import LazyLoad from "react-lazyload";

const Post = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, error, isLiked } = useAppSelector((state) => state.currentPost);
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState<boolean>(false);
  useTitle(post.title);

  useEffect(() => {
    dispatch(setIsLiked(false));
    dispatch(fetchPostById(Number(postId)));
  }, [postId, dispatch, user]);

  if (error) {
    return <NotFound />;
  }

  if (Object.keys(post).length === 0 || post.id !== Number(postId)) {
    return <Loader />;
  }

  const addLike = () => {
    if (!isAuth) {
      setShowModal(true);
    } else if (!isLiked) {
      dispatch(likePost(Number(postId)));
    }
  };

  return (
    <div className={"postWrapper"}>
      <ModalWindow showModal={showModal} setShowModal={setShowModal} />
      <div className={"postInner"}>
        <div className={"postDescription"}>
          <img src={`${post.postImage}`} alt="postPicture" />
          <Link to={"/"} className={"link"}>
            <button className={"back"}>
              <KeyboardBackspaceIcon className={"backIcon"} />
              <span>Home</span>
            </button>
          </Link>
          <div className={"postInfo"}>
            <div className={"author"}>
              <LazyLoad>
                <img src={post?.user.profilePicture} alt="postPicture" />
              </LazyLoad>

              <div className={"authorDetails"}>
                <span className={"name"}>
                  {post?.user?.firstName} {post.user.lastName}
                </span>
                <span className={"date"}>
                  {formatDate(post.dateAndTimePublish)}
                </span>
              </div>
            </div>
            <h1>{post.title}</h1>
          </div>
          <div
            className={"postText"}
            dangerouslySetInnerHTML={{
              __html: post.text.replace(/\n/g, "<br />"),
            }}
          />
          <div className={"postActionsInfo"}>
            <div className={"postLike"}>
              {isLiked ? (
                <FavoriteIcon className={"liked"} />
              ) : (
                <FavoriteBorderIcon
                  onClick={addLike}
                  className={"postActionsIcon like"}
                />
              )}
              <span>{post.userLikes.length}</span>
            </div>
            <div className={"postLike"}>
              <ChatBubbleOutlineIcon className={"postActionsIcon"} />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </div>
        <div className={"postComments"}>
          <h2>Comments</h2>
          <CommentForm />
          <div className={"commentsList"}>
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <div className={"noComments"}>No comments yet</div>
            )}
          </div>
        </div>
      </div>
      <LatestList />
    </div>
  );
};

export default Post;
