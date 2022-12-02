import React, {FC, useEffect, useState} from 'react';
import './tagPosts.scss'
import {IPost} from "../../types/post-type";
import PostService from "../../services/post-service";
import {useParams} from "react-router-dom";
import TagService from "../../services/tag-service";
import {ITag} from "../../types/tag-type";
import PostItem from "../postlist/postitem/PostItem";
import Sidebar from "../sidebar/Sidebar";

const TagPosts: FC = () => {
    const {tagId} = useParams()
    const [posts, setPosts] = useState<IPost[]>([])
    const [tag, setTag] = useState<ITag>({} as ITag)
    const [error, setError] = useState('')

    useEffect(() => {
        const getInfo = async (tagId: number) => {
            try{
                const posts = await PostService.getByTagId(tagId)
                const tag = await TagService.getTagById(tagId)
                setPosts(posts.data)
                setTag(tag.data)
            }catch(e: any){
                setError(e.response.data.message)
            }
        }
        getInfo(Number(tagId))
    }, [tagId])
    return (
        <div className={'tagPostsWrapper'}>
            <div className={'tagPostsSidebar'}>
                <Sidebar homePage={false}/>
            </div>
            <div className={'tagPostsList'}>
                {posts?.length > 0 && posts.map(post => <PostItem key={post.id} post={post}/>)}
                {error && <div>Error</div>}
            </div>
            <div className={'tagPostsInfo'}>
                <div style={{backgroundColor: `#${tag?.color}`}} className={'tagPostsInfoTop'}>
                    #{tag?.name}
                </div>
                <div className={'tagPostsInfoDescription'}>
                    {tag?.description}
                </div>
                <div className={'tagPostsInfoBottom'}>
                    {posts?.length} posts published
                </div>
            </div>
        </div>
    );
};

export default TagPosts;