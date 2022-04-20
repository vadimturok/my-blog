import {
    PostActionsEnum,
    PostsAction,
    PostSortActions,
    SetAddPost,
    SetError,
    SetIsLoading,
    SetPosts,
    SetStatus,
} from "./types";
import {IPost} from "../../../types/post-type";
import {AppDispatch} from "../../index";
import PostService from "../../../services/post-service";


export const setSort = (sortType: PostSortActions): PostsAction => {
    if(sortType === PostSortActions.SORT_BY_LIKES)
        return {type: PostSortActions.SORT_BY_LIKES}
    if(sortType === PostSortActions.SORT_BY_COMMENTS)
        return {type: PostSortActions.SORT_BY_COMMENTS}
    else
        return {type: PostSortActions.SORT_BY_TIME}
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

export const fetchAllPosts = (sortType: PostSortActions) => async(dispatch: AppDispatch) => {
    dispatch(setStatus('loading'))
    try{
        const response = await PostService.getAll()
        dispatch(setPosts(response.data))
        dispatch(setSort(sortType))
        dispatch(setStatus('succeeded'))
    }catch(e: any){
        dispatch(setError(e.response.data.message))
        dispatch(setStatus('failed'))
    }
}

export const setAddPost = (post: IPost): SetAddPost => {
    return {type: PostActionsEnum.ADD_POST, payload: post}
}
