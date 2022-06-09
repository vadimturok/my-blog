import {IUser} from "../../../types/user-type";
import {IPost} from "../../../types/post-type";

export interface AuthState{
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
    isSuccess: 'default' | 'success'
}

export enum AuthActionsEnum{
    SET_USER = "SET_USER",
    SET_IS_AUTH = 'SET_IS_AUTH',
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_ERROR = 'SET_ERROR',
    SET_IS_SUCCESS = 'SET_IS_SUCCESS',
    ADD_POST = 'ADD_POST'
}

export interface AddPost{
    type: AuthActionsEnum.ADD_POST;
    payload: IPost
}

export interface SetIsSuccess{
    type: AuthActionsEnum.SET_IS_SUCCESS;
    payload: 'default' | 'success'
}

export interface SetError{
    type: AuthActionsEnum.SET_ERROR,
    payload: string;
}

export interface SetUserAction{
    type: AuthActionsEnum.SET_USER;
    payload: IUser
}

export interface SetIsAuth{
    type: AuthActionsEnum.SET_IS_AUTH;
    payload: boolean;
}

export interface SetIsLoading{
    type: AuthActionsEnum.SET_IS_LOADING;
    payload: boolean;
}

export type AuthAction = SetUserAction | SetIsAuth | SetIsLoading | SetError | SetIsSuccess | AddPost