import React, {FC} from 'react';
import './postlist.scss'
import PostItem from "./postitem/PostItem";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Loader from "../loader/Loader";
import {motion} from "framer-motion";


const PostList: FC = () => {
    const {posts, status} = useSelector((state: RootState) => state.posts)

    return (
        <div className={'postList'}>
            {status !== 'succeeded'  ? <Loader/> : posts.length === 0 ? <div className={'noPosts'}>No posts yet</div> :
                posts.map(post => <motion.div
                    key={post.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}>
                    <PostItem displayImage={true} post={post}/>
                </motion.div>)
            }
        </div>
    );
};

export default PostList;