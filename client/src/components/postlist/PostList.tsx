import React, {FC} from 'react';
import './postlist.scss'
import PostItem from "./postitem/PostItem";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Loader from "../loader/Loader";


const PostList: FC = () => {
    const {posts, status} = useSelector((state: RootState) => state.posts)

    return (
        <div className={'postList'}>
            {status !== 'succeeded' ? <Loader/> : posts.length === 0 ? <div className={'noPosts'}>No posts yet</div> :
                posts.map(post => <PostItem displayImage={true} key={post.id} post={post}/>)
            }
        </div>
    );
};

export default PostList;