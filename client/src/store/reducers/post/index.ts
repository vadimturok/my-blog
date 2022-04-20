import {PostActionsEnum, PostsAction, PostSortActions, PostState} from "./types";

const initialState: PostState = {
    error: '',
    isLoading: false,
    posts: [],
    sortType: PostSortActions.SORT_BY_TIME,
    status: 'idle'
}

export default function postsReducer(state = initialState, action: PostsAction): PostState{
    switch(action.type){
        case PostActionsEnum.ADD_POST:
            return {...state, posts: state.posts.concat(action.payload)}
        case PostActionsEnum.SET_STATUS:
            return {...state, status: action.payload}
        case PostActionsEnum.SET_ERROR:
            return {...state, error: action.payload}
        case PostActionsEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case PostActionsEnum.SET_POSTS:
            return {...state, posts: action.payload}
        case PostSortActions.SORT_BY_TIME:
            return {...state, sortType: PostSortActions.SORT_BY_TIME, posts: state.posts.sort((a, b) =>
                    new Date(b.dateAndTimePublish).getTime() - new Date(a.dateAndTimePublish).getTime())}
        case PostSortActions.SORT_BY_LIKES:
            return {...state, sortType: PostSortActions.SORT_BY_LIKES ,posts: state.posts.sort((a,b) => b.likes - a.likes)}
        case PostSortActions.SORT_BY_COMMENTS:
            return {...state, sortType: PostSortActions.SORT_BY_COMMENTS, posts: state.posts.sort((a, b) => b.comments.length - a.comments.length)}
        default:
            return state
    }
}