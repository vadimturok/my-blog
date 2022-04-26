import {
    PostActionsEnum,
    PostsAction,
    PostSortActions,
    SetAddPost,
    SetError,
    SetIsLoading,
    SetPosts,
    SetStatus,
    SetTodayPosts,
    UpdateComments,
    UpdateLikes,
    UpdatePosts
} from "./types";
import {IPost} from "../../../types/post-type";
import {AppDispatch} from "../../index";
import PostService from "../../../services/post-service";
import {IUser} from "../../../types/user-type";
import {IComment} from "../../../types/comment-type";
import {ILike} from "../../../types/like-type";


export const setSort = (sortType: PostSortActions): PostsAction => {
    if(sortType === PostSortActions.SORT_BY_LIKES)
        return {type: PostSortActions.SORT_BY_LIKES}
    if(sortType === PostSortActions.SORT_BY_COMMENTS)
        return {type: PostSortActions.SORT_BY_COMMENTS}
    else
        return {type: PostSortActions.SORT_BY_TIME}
}


export const setTodayPosts = (posts: IPost[]): SetTodayPosts => {
    return {type: PostActionsEnum.SET_TODAY_POSTS, payload: posts}
}

export const setError = (error: string): SetError => {
    return {type: PostActionsEnum.SET_ERROR, payload: error}
}

export const setIsLoading = (isLoading: boolean): SetIsLoading => {
    return {type: PostActionsEnum.SET_IS_LOADING, payload: isLoading}
}

export const setPosts = (posts: IPost[]): SetPosts => {
    return {type: PostActionsEnum.SET_POSTS, payload: posts}
}

export const setStatus = (status: 'idle' | 'loading' | 'succeeded' | 'failed'): SetStatus => {
    return {type: PostActionsEnum.SET_STATUS, payload: status}
}

export const setAddPost = (post: IPost): SetAddPost => {
    return {type: PostActionsEnum.ADD_POST, payload: post}
}

export const setUpdatePosts = (user: IUser): UpdatePosts => {
    return {type: PostActionsEnum.UPDATE_POSTS, payload: user}
}

export const updateComments = (comment: IComment): UpdateComments => {
    return {type: PostActionsEnum.UPDATE_COMMENTS, payload: comment}
}
export const updateLikes = (like: ILike): UpdateLikes => {
    return {type: PostActionsEnum.UPDATE_LIKES, payload: like}
}

export const fetchAllPosts = (sortType: PostSortActions) => async(dispatch: AppDispatch) => {
    dispatch(setStatus('loading'))
    try{
        const response = await PostService.getAll()
        dispatch(setStatus('succeeded'))
        dispatch(setPosts(response.data))
        dispatch(setSort(sortType))
    }catch(e: any){
        dispatch(setError(e.response.data.message))
        dispatch(setStatus('failed'))
    }
}

export const fetchTodayPosts = (quantity: number) => async(dispatch: AppDispatch) => {
    try{
        const posts = await PostService.getTodayPosts(quantity)
        dispatch(setTodayPosts(posts.data))
    }catch(e: any){
        console.log(e.response)
    }
}



