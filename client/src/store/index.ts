import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import authReducer from "./reducers/auth";
import postsReducer from "./reducers/post";
import currentPostReducer from "./reducers/currentPost";

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    currentPost: currentPostReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch