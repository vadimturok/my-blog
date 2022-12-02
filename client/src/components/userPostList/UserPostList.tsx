import React, {FC, useEffect, useState} from 'react';
import './userPostList.scss'
import PostItem from "../postlist/postitem/PostItem";
import {IUser} from "../../types/user-type";
import PostService from "../../services/post-service";
import {IPost} from "../../types/post-type";

interface UserPostListProps{
    user: IUser
}

const UserPostList: FC<UserPostListProps> = ({user }) => {
    const [posts, setPosts] = useState<IPost[]>([])
    useEffect(() => {
        const getPosts = async () => {
            try{
                const response = await PostService.getByUserId(user.id)
                setPosts(response.data)
            }catch(e: any){
                console.log('Error fetching user`s posts')
            }
        }
        getPosts()
    }, [user])
    return (
        <div className={'userPostList'}>
            {
                posts.length > 0 ? posts.map(post =>
                    <div key={post.id} className={'userPostListItem'}>
                        <PostItem post={post}/>
                    </div>
                ) : <div className={'noPostsCreatedByUser'}>You haven't created posts yet</div>
            }
        </div>
    );
};

export default UserPostList;
