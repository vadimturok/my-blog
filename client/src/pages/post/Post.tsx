import React, {useEffect} from 'react';
import './post.scss'
import LatestList from "../../components/latestlist/LatestList";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Link, useParams} from "react-router-dom";
import Comment from "../../components/comment/Comment";
import CommentForm from "../../components/commentForm/CommentForm";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useDispatch} from "react-redux";
import {fetchPostById} from "../../store/reducers/currentPost/action-creators";
import NotFound from "../404/NotFound";
import Loader from "../../components/loader/Loader";
import {useAppSelector} from "../../hooks";
import {API_URL} from "../../http";
import {formatDate} from "../../helpers";

const Post = () => {
    const {postId} = useParams()
    const dispatch = useDispatch()
    const {post, error} = useAppSelector(state => state.currentPost)

    useEffect(() => {
        dispatch(fetchPostById(Number(postId)))
    }, [postId, dispatch])

    if(error){
        return <NotFound/>
    }

    if(Object.keys(post).length === 0){
        return <Loader/>
    }

    return (
            <div className={'postWrapper'}>
                <div className={'postInner'}>
                    <div className={'postDescription'}>
                        <img src={`${post?.postImage}`} alt="postPicture"/>
                        <Link to={'/'} className={'link'}>
                            <button className={'back'}>
                                <KeyboardBackspaceIcon className={'backIcon'}/>
                                <span>Back</span>
                            </button>
                        </Link>
                        <div className={'postInfo'}>
                            <div className={'author'}>
                                <img src={`${post?.postImage}`} alt="postPicture"/>
                                <div className={'authorDetails'}>
                                    <span className={'name'}>{post?.user?.firstName} {post?.user?.lastName}</span>
                                    <span className={'date'}>{formatDate(post?.dateAndTimePublish)}</span>
                                </div>
                            </div>
                            <h1>{post?.title}</h1>
                        </div>
                        <div className={'postText'} dangerouslySetInnerHTML={{__html: post?.text}}/>
                        <div className={'postLike'}>
                            <FavoriteBorderIcon className={'likeIcon'}/>
                            <span>Like post</span>
                        </div>
                    </div>
                    <div className={'postComments'}>
                        <h2>Comments</h2>
                        <CommentForm/>
                        <div className={'commentsList'}>
                            {post?.comments?.length > 0
                                ?
                                post?.comments.map(comment => <Comment key={comment.id} comment={comment}/>)
                                :
                                <div className={'noComments'}>No comments yet</div>
                            }
                        </div>
                    </div>
                </div>
                <LatestList/>
            </div>
        );

}

export default Post;