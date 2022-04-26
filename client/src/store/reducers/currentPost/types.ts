import {IPost} from "../../../types/post-type";
import {IComment} from "../../../types/comment-type";

export interface CurrentPostState{
    post: IPost;
    error: string;
    addCommentStatus: 'default' | 'success' | 'failed',
    isLiked: boolean
}

export enum CurrentPostEnum{
    SET_ERROR = 'SET_ERROR',
    SET_POST = 'SET_POST',
    ADD_COMMENT = 'ADD_COMMENT',
    SET_COMMENT_STATUS = 'SET_COMMENT_STATUS',
    SET_IS_LIKED = 'SET_IS_LIKED'
}

export interface SetIsLiked{
    type: CurrentPostEnum.SET_IS_LIKED,
    payload: boolean
}


export interface SetCommentStatus{
    type: CurrentPostEnum.SET_COMMENT_STATUS,
    payload: 'default' | 'success' | 'failed'
}

export interface SetAddComment{
    type: CurrentPostEnum.ADD_COMMENT,
    payload: IComment
}
export interface SetError{
    type: CurrentPostEnum.SET_ERROR,
    payload: string;
}

export interface SetPost{
    type: CurrentPostEnum.SET_POST,
    payload: IPost
}

export type CurrentPostAction =  SetError | SetPost | SetAddComment | SetCommentStatus | SetIsLiked