import api from "../http";
import {IPost} from "../types/post-type";
import {AxiosResponse} from "axios";
import {IComment} from "../types/comment-type";
import {IUser} from "../types/user-type";

export default class PostService{
    static async createPost(picture: any, title: string, text: string, userId: number){
        const formData = new FormData()
        formData.append('picture', picture)
        formData.append('title', title)
        formData.append('text', text)
        formData.append('userId', userId.toString())
        return api.post<IPost>('/posts', formData)
    }
    static async getAll(): Promise<AxiosResponse<IPost[]>>{
        return api.get<IPost[]>('/posts')
    }

    static async getById(postId: number): Promise<AxiosResponse<IPost>>{
        return api.get<IPost>(`/posts/post/${postId}`)
    }

    static async createComment(text: string, postId: number, userId: number): Promise<AxiosResponse<IComment>> {
        return api.post<IComment>('/comments', {text, postId, userId})
    }

    static async getTodayPosts(quantity: number): Promise<AxiosResponse<IPost[]>>{
        return api.get<IPost[]>(`/posts/today?quantity=${quantity}`)
    }

    static updatePostsById(user: IUser, posts: IPost[]): IPost[]{
        return posts.map(post => {
            if(post.user.id === user.id){
                post.user = user
                return post
            }
            return post
        })
    }

    static updatePostByComment(comment: IComment, posts: IPost[]): IPost[]{
        return posts.map(post => {
            if(post.id === comment.post.id){
                post.comments.push(comment)
                return post
            }
            return post
        })
    }

    static orderByLikes(posts: IPost[]): IPost[]{
        return posts.sort((a,b) =>
            b.likes - a.likes)
    }
    static orderByComments(posts: IPost[]): IPost[]{
        return posts.sort((a, b) =>
            b.comments.length - a.comments.length);
    }
    static orderByTime(posts: IPost[]): IPost[]{
        return posts.sort((a, b) =>
            new Date(b.dateAndTimePublish).getTime() -
            new Date(a.dateAndTimePublish).getTime())
    }
}