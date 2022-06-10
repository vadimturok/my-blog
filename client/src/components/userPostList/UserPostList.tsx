import React, {FC} from 'react';
import './userPostList.scss'
import PostItem from "../postlist/postitem/PostItem";
import {IUser} from "../../types/user-type";

interface UserPostListProps{
    user: IUser
}

const UserPostList: FC<UserPostListProps> = ({user }) => {
    return (
        <div className={'userPostList'}>
            {
                user.posts?.length > 0 ? user.posts.map(post =>
                    <div key={post.id} className={'userPostListItem'}>
                        <PostItem post={post}/>
                    </div>
                ) : <div className={'noPostsCreatedByUser'}>You haven't created posts yet</div>
            }
        </div>
    );
};

export default UserPostList;