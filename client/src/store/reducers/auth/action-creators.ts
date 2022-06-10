import {IUser} from "../../../types/user-type";
import {
    AddPost,
    AuthActionsEnum,
    DeletePost,
    SetError,
    SetIsAuth,
    SetIsLoading,
    SetIsSuccess,
    SetUserAction
} from "./types";
import {AppDispatch} from "../../index";
import AuthService from "../../../services/auth-service";
import axios from "axios";
import {AuthResponse} from "../../../types/auth-response";
import {API_URL} from "../../../http";
import UserService from "../../../services/user-service";
import {setUpdatePosts} from "../post/action-creators";
import {IPost} from "../../../types/post-type";

export const setUser = (user: IUser): SetUserAction => {
    return {type: AuthActionsEnum.SET_USER, payload: user}
}

export const setIsSuccess = (isSuccess: 'default' | 'success'): SetIsSuccess => {
    return {type: AuthActionsEnum.SET_IS_SUCCESS, payload: isSuccess}
}

export const setError = (error: string): SetError => {
    return {type: AuthActionsEnum.SET_ERROR, payload: error}
}

export const setIsAuth = (auth: boolean): SetIsAuth => {
    return {type: AuthActionsEnum.SET_IS_AUTH, payload: auth}
}
export const AddNewPost = (post: IPost): AddPost => {
    return {type: AuthActionsEnum.ADD_POST, payload: post}
}

export const deletePost = (post: IPost): DeletePost => {
    return {type: AuthActionsEnum.DELETE_POST, payload: post}
}

export const setIsLoading = (isLoading: boolean): SetIsLoading => {
    return {type: AuthActionsEnum.SET_IS_LOADING, payload: isLoading}
}


export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try{
        const response = await AuthService.login(email, password);
        AuthService.authorizeUser(dispatch, response)
    }catch(e: any){
        AuthService.catchAuthorizationError(dispatch, e)
    }
}

export const registration = (firstName: string, lastName: string, email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try{
        const response = await AuthService.registration(firstName, lastName, email, password)
        AuthService.authorizeUser(dispatch, response)
    }catch(e: any){
        AuthService.catchAuthorizationError(dispatch, e)
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try{
        await AuthService.logout()
        localStorage.removeItem('token')
        dispatch(setUser({} as IUser))
    }catch(e: any){
        dispatch(setError(e.response.data.message))
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try{
        const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
        AuthService.authorizeUser(dispatch, response)
    }catch(e){
        dispatch(setIsLoading(false))
    }
}

export const updateUser =
    (userId: number, firstName: string, lastName: string, email: string, picture?: any) =>
        async(dispatch: AppDispatch) => {
    dispatch(setError(''))
    try{
        const response = await UserService.updateUser(userId, firstName, lastName, email, picture)
        dispatch(setUser(response.data))
        dispatch(setUpdatePosts(response.data))
        dispatch(setIsSuccess('success'))
        setTimeout(() => {
            dispatch(setIsSuccess('default'))
        }, 2000)
    }catch(e: any){
        dispatch(setError(e.response.data.message))
    }
}

