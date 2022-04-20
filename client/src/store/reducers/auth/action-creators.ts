import {IUser} from "../../../types/user-type";
import {AuthActionsEnum, SetError, SetIsAuth, SetIsLoading, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import AuthService from "../../../services/auth-service";
import axios from "axios";
import {AuthResponse} from "../../../types/auth-response";
import {API_URL} from "../../../http";

export const setUser = (user: IUser): SetUserAction => {
    return {type: AuthActionsEnum.SET_USER, payload: user}
}

export const setError = (error: string): SetError => {
    return {type: AuthActionsEnum.SET_ERROR, payload: error}
}

export const setIsAuth = (auth: boolean): SetIsAuth => {
    return {type: AuthActionsEnum.SET_IS_AUTH, payload: auth}
}

export const setIsLoading = (isLoading: boolean): SetIsLoading => {
    return {type: AuthActionsEnum.SET_IS_LOADING, payload: isLoading}
}

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try{
        const response = await AuthService.login(email, password);
        localStorage.setItem('token', response.data.accessToken)
        dispatch(setIsAuth(true))
        dispatch(setUser(response.data.user))
        dispatch(setIsLoading(false))
        dispatch(setError(''))
    }catch(e: any){
        if(e.response){
            if(Array.isArray(e.response.data.message)){
                dispatch(setError(e.response.data.message[0]))
            }else{
                dispatch(setError(e.response.data.message))
            }
            dispatch(setIsLoading(false))
        }
    }
}

export const registration = (firstName: string, lastName: string, email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try{
        const response = await AuthService.registration(firstName, lastName, email, password)
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setIsAuth(true))
        dispatch(setUser(response.data.user))
        dispatch(setIsLoading(false))
        dispatch(setError(''))
    }catch(e: any){
        if(e.response){
            if(Array.isArray(e.response.data.message)){
                dispatch(setError(e.response.data.message[0]))
            }else{
                dispatch(setError(e.response.data.message))
            }
            dispatch(setIsLoading(false))
        }
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
        localStorage.setItem('token', response.data.accessToken)
        dispatch(setIsAuth(true))
        dispatch(setUser(response.data.user))
        dispatch(setIsLoading(false))
    }catch(e){
        dispatch(setIsLoading(false))
    }
}