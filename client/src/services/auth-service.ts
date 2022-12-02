import {AxiosResponse} from "axios";
import {AuthResponse} from "../types/auth-response";
import api from "../http/index";

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
}