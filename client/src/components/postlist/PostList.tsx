import React, {FC} from 'react';
import './postlist.scss'
import PostItem from "./postitem/PostItem";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import Loader from "../loader/Loader";
import {motion} from "framer-motion";
import {fetchAllPostsByQuery} from "../../store/reducers/post/action-creators";


const PostList: FC = () => {
    const {posts, status} = useSelector((state: RootState) => state.posts)
    const {currentPage, totalPages} = useSelector((state: RootState) => state.posts.paginationInfo)
    const dispatch = useDispatch()

    const handleNext = () => {
        if(currentPage !== totalPages){
            dispatch(fetchAllPostsByQuery(currentPage + 1, 4))
        }
    }
    const handlePrevious = () => {
        if(currentPage !== 1){
            dispatch(fetchAllPostsByQuery(currentPage - 1, 4))
        }
    }

    return (
        <div className={'postList'}>
            {status !== 'succeeded'  ? <Loader/> : posts.length === 0 ? <div className={'noPosts'}>No posts yet</div> :
                posts.map(post =>
                    <motion.div key={post.id} initial={{opacity: 0}} animate={{opacity: 1}}>
                        <PostItem displayImage={true} post={post}/>
                    </motion.div>)
            }
            <div className={'pagination'}>
                <button disabled={currentPage === 1} onClick={handlePrevious} className={'paginationBtn'}>⬅ Previous</button>
                <div className={'paginationPages'}>
                    {

                    }
                </div>
                <button disabled={currentPage === totalPages} onClick={handleNext} className={'paginationBtn'}>Next ➡</button>
            </div>
        </div>
    );
};

export default PostList;