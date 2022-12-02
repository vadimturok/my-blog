import {configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/auth/authSlice'
import postsReducer from './reducers/posts/postsSlice'
import tagsReducer from './reducers/tags/tagsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        tags: tagsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch