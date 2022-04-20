import {IUser} from "../../../types/user-type";

export interface AuthState{
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
}

export enum AuthActionsEnum{
    SET_USER = "SET_USER",
    SET_IS_AUTH = 'SET_IS_AUTH',
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_ERROR = 'SET_ERROR'
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

export type AuthAction = SetUserAction | SetIsAuth | SetIsLoading | SetError