import {IUser} from "../../../types/user-type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthResponse} from "../../../types/auth-response";
import {authorizeUser, logoutUser} from "./actionCreators";


interface AuthState{
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
}
const initialState: AuthState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    error: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state: AuthState, action: PayloadAction<IUser>){
            state.user = action.payload
        },
        setError(state: AuthState, action: PayloadAction<string>){
            state.error = action.payload
        }
    },
    extraReducers: {
        [authorizeUser.pending.type]: (state: AuthState, action) => {
            state.error = ''
            state.isLoading = true
        },
        [authorizeUser.fulfilled.type]: (state: AuthState, action: PayloadAction<AuthResponse>) => {
            localStorage.setItem('token', action.payload.accessToken)
            localStorage.setItem('role', action.payload.user.role)
            state.isLoading = false
            state.isAuth = true
            state.user = action.payload.user
            state.error = ''
        },
        [authorizeUser.rejected.type]: (state: AuthState, action: PayloadAction<any>) => {
            const error = action.payload
            if (error.response) {
                if (Array.isArray(error.response.data.message)) {
                    state.error = error.response.data.message[0]
                }else{
                    state.error = error.response.data.message
                }
            }
            state.isLoading = false
        },
        [logoutUser.fulfilled.type]: (state: AuthState, action) => {
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            state.user = {} as IUser
            state.isAuth = false
        },
        [logoutUser.rejected.type]: (state: AuthState, action: PayloadAction<any>) => {
            state.error = action.payload.response.data.message
        }
    }
})

export default authSlice.reducer
export const {
    setUser,
    setError
} = authSlice.actions