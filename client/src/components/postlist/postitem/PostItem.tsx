import React, {FC} from 'react';
import './postitem.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {Link} from "react-router-dom";
import {IPost} from "../../../types/post-type";
import {API_URL} from "../../../http";
import {formatDate} from "../../../helpers";

interface PostItemProps{
    post: IPost;
}

const PostItem: FC<PostItemProps> = ({post}) => {
    return (
        <div className={'postItem'}>
            <img className={'postImg'} src={`${post.postImage}`} alt="postPicture"/>
            <div className={'previewInfo'}>
                <div className={'authorInfo'}>
                    <img src={`${post.postImage}`} alt="avatar"/>
                    <div className={'authorDescription'}>
                        <span className={'authorName'}>{post.user.firstName + ' ' + post.user.lastName}</span>
                        <span className={'postDate'}>{formatDate(post.dateAndTimePublish)}</span>
                    </div>
                </div>
                <Link to={`/posts/${post.id}`} className={'link'}>
                    <div className={'postInfoTitle'}>
                        <h2>{post.title}</h2>
                    </div>

                </Link>

            </div>
            <div className={'postReactions'}>
                <div className={'postReactionsInfo'}>
                    <FavoriteBorderIcon className={'postReactionsIcon'}/>
                    <span>{post.likes} Likes</span>
                </div>
                <div className={'postReactionsInfo'}>
                    <ChatBubbleOutlineIcon className={'postReactionsIcon'}/>
                    <span>{post.comments.length} Comments</span>
                </div>
            </div>
        </div>
    );
};

export default PostItem;