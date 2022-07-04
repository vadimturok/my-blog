import {configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/auth/authSlice'
import postsReducer from './reducers/posts/postsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch