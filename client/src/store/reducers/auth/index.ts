import {AuthAction, AuthActionsEnum, AuthState} from "./types";
import {IUser} from "../../../types/user-type";
import {IPost} from "../../../types/post-type";

const initialState: AuthState = {
    user: {
        posts: [] as IPost[]
    } as IUser,
    isAuth: false,
    isLoading: false,
    error: '',
    isSuccess: 'default'
}

export default function authReducer(state = initialState, action: AuthAction): AuthState{
    switch(action.type){
        case AuthActionsEnum.DELETE_POST:
            return {...state, user: {...state.user, posts: state.user.posts.filter(p => p.id !== action.payload.id)}}
        case AuthActionsEnum.ADD_POST:
            return {...state, user: {...state.user, posts: state.user.posts.concat([action.payload])}}
        case AuthActionsEnum.SET_IS_SUCCESS:
            return {...state, isSuccess: action.payload}
        case AuthActionsEnum.SET_USER:
            return {...state, user: action.payload}
        case AuthActionsEnum.SET_IS_AUTH:
            return {...state, isAuth: action.payload}
        case AuthActionsEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case AuthActionsEnum.SET_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}