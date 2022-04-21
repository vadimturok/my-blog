import {CurrentPostEnum, SetAddComment, SetError, SetPost} from "./types";
import {IPost} from "../../../types/post-type";
import {AppDispatch} from "../../index";
import PostService from "../../../services/post-service";
import {IComment} from "../../../types/comment-type";
import {SetCommentStatus} from "./types";
import {updateComments} from "../post/action-creators";

export const setError = (error: string): SetError => {
    return {type: CurrentPostEnum.SET_ERROR, payload: error}
}
export const setAddComment = (comment: IComment): SetAddComment => {
    return {type: CurrentPostEnum.ADD_COMMENT, payload: comment}
}

export const setCommentStatus = (status: 'default' | 'success' | 'failed'): SetCommentStatus => {
    return {type: CurrentPostEnum.SET_COMMENT_STATUS, payload: status}
}

export const setPost = (post: IPost): SetPost => {
    return {type: CurrentPostEnum.SET_POST, payload: post}
}

export const fetchPostById = (postId: number) => async (dispatch: AppDispatch) => {
    dispatch(setError(''))
    try{
        const response = await PostService.getById(postId)
        if(response.data){
            dispatch(setPost(response.data))
        }else{
            dispatch(setError('Error'))
        }
    }catch(e: any){
        dispatch(setError('Error'))
    }
}

export const createComment = (text: string, postId: number, userId: number) => async (dispatch: AppDispatch) => {
    dispatch(setCommentStatus('default'))
    try{
        const response = await PostService.createComment(text, postId, userId)
        dispatch(setAddComment(response.data))
        dispatch(updateComments(response.data))
        dispatch(setCommentStatus('success'))
        setTimeout(() => {
            dispatch(setCommentStatus('default'))
        }, 2000)
    }catch(e: any){
        if(e.response){
            dispatch(setCommentStatus('failed'))
        }
    }
}
