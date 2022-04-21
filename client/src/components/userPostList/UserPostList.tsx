import React, {FC} from 'react';
import './userPostList.scss'
import PostItem from "../postlist/postitem/PostItem";
import {IUser} from "../../types/user-type";
import {useAppSelector} from "../../hooks";

interface UserPostListProps{
    user: IUser
}

const UserPostList: FC<UserPostListProps> = ({user }) => {
    const {posts} = useAppSelector(state => state.posts)

    return (
        <div className={'userPostList'}>
            {
                posts.map(post => post.user.id === user.id &&
                    <div key={post.id} className={'userPostListItem'}>
                        <PostItem  post={post}/>
                    </div>
                )
            }
        </div>
    );
};

export default UserPostList;