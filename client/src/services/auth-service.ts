import {AxiosResponse} from "axios";
import {AuthResponse} from "../types/auth-response";
import api from "../http/index";
import {AppDispatch} from "../store";
import {setError, setIsAuth, setIsLoading, setUser} from "../store/reducers/auth/action-creators";

export default class AuthService{
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return api.post<AuthResponse>('/auth/login', {email, password})
    }

    static async registration(firstName: string, lastName: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return api.post<AuthResponse>('/auth/register', {firstName, lastName, email, password})
    }
    static async logout(): Promise<void>{
        return api.delete('/auth/logout')
    }

    static authorizeUser = (dispatch: AppDispatch, response: any) => {
        console.log(response.data.user)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(setIsAuth(true))
        dispatch(setUser(response.data.user))
        dispatch(setIsLoading(false))
        dispatch(setError(''))
    }

    static catchAuthorizationError = (dispatch: AppDispatch, e: any) => {
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