import {IPost} from "../../../types/post-type";
import {IUser} from "../../../types/user-type";
import {IComment} from "../../../types/comment-type";
import {ILike} from "../../../types/like-type";

export interface PostState{
    isLoading: boolean;
    error: string;
    posts: IPost[];
    sortType: PostSortActions;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    todayPosts: IPost[];
}


export enum PostSortActions{
    SORT_BY_TIME = 'SORT_BY_TIME',
    SORT_BY_LIKES = 'SORT_BY_LIKES',
    SORT_BY_COMMENTS = 'SORT_BY_COMMENTS',
}

export enum PostActionsEnum{
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_ERROR = 'SET_ERROR',
    SET_POSTS = 'SET_POSTS',
    ADD_POST = 'ADD_POST',
    SET_STATUS = 'SET_STATUS',
    SET_TODAY_POSTS = 'SET_TODAY_POSTS',
    UPDATE_POSTS = 'UPDATE_POSTS',
    UPDATE_COMMENTS = 'UPDATE_COMMENTS',
    UPDATE_LIKES = 'UPDATE_LIKES'
}

export interface UpdateLikes{
    type: PostActionsEnum.UPDATE_LIKES,
    payload: ILike
}

export interface UpdatePosts{
    type: PostActionsEnum.UPDATE_POSTS,
    payload: IUser
}


export interface SetTodayPosts{
    type: PostActionsEnum.SET_TODAY_POSTS,
    payload: IPost[]
}

export interface SetStatus{
    type: PostActionsEnum.SET_STATUS,
    payload: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface SetAddPost{
    type: PostActionsEnum.ADD_POST;
    payload: IPost;
}

export interface SetSort{
    type: PostSortActions
}

export interface SetIsLoading{
    type: PostActionsEnum.SET_IS_LOADING,
    payload: boolean
}
export interface SetError{
    type: PostActionsEnum.SET_ERROR,
    payload: string
}
export interface SetPosts{
    type: PostActionsEnum.SET_POSTS,
    payload: IPost[]
}

export interface UpdateComments{
    type: PostActionsEnum.UPDATE_COMMENTS,
    payload: IComment
}

export type PostsAction =
    SetIsLoading |
    SetError |
    SetPosts |
    SetSort |
    SetAddPost |
    SetStatus |
    SetTodayPosts |
    UpdatePosts |
    UpdateComments |
    UpdateLikes