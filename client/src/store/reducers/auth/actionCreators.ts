import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../../services/auth-service";
import axios from "axios";
import {AuthResponse} from "../../../types/auth-response";
import {API_URL} from "../../../http";

export interface authArgs{
    type: 'login' | 'register' | 'checkAuth'
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export const authorizeUser = createAsyncThunk('auth/login', async (args: authArgs, thunkAPI) => {
    try{
        let response
        if(args.type === 'login'){
            response = await AuthService.login(args.email!, args.password!);
        }else if(args.type === 'register'){
            response = await AuthService.registration(args.firstName!, args.lastName!, args.email!, args.password!)
        }else if(args.type === 'checkAuth'){
            response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
        }
        return response?.data
    }catch(e){
        return thunkAPI.rejectWithValue(e)
    }
})

export const logoutUser = createAsyncThunk('auth/logout', async (args, thunkAPI) => {
    try{
        await AuthService.logout()
    }catch(e){
        return thunkAPI.rejectWithValue(e)
    }
})
