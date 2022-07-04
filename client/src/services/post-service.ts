import api from "../http";
import {IPost} from "../types/post-type";
import {AxiosResponse} from "axios";
import {IComment} from "../types/comment-type";
import {ILike} from "../types/like-type";

export default class PostService{
    static async createPost(picture: any, title: string, text: string, userId: number){
        const formData = new FormData()
        formData.append('picture', picture)
        formData.append('title', title)
        formData.append('text', text)
        formData.append('userId', userId.toString())
        return api.post<IPost>('/posts', formData)
    }

    static async getPosts(type: 'latest' | 'hot' | 'best'): Promise<AxiosResponse<IPost[]>>{
        return api.get<IPost[]>(`posts/${type}`)
    }


    static async updatePost(title: string, text: string, postImage: string, postId: number, picture?: any): Promise<AxiosResponse<IPost>>{
        if(picture){
            const formData = new FormData()
            formData.append('title', title)
            formData.append('text', text)
            formData.append('postImage', postImage)
            formData.append('picture', picture)
            formData.append('postId', postId.toString())
            return api.put<IPost>('/posts', formData)
        }
        return api.put<IPost>('/posts', {title, text, postImage, postId})
    }

    static async deletePost(postId: number){
        await api.delete(`/posts/post/${postId}`)
    }

    static async getById(postId: number): Promise<AxiosResponse<IPost>>{
        return api.get<IPost>(`/posts/post/${postId}`)
    }

    static async createComment(text: string, postId: number, userId: number): Promise<AxiosResponse<IComment>> {
        return api.post<IComment>('/comments', {text, postId, userId})
    }

    static async likePost(userId: number, postId: number): Promise<AxiosResponse<ILike>>{
        return api.post<ILike>('/likes', {userId, postId})
    }

    static async getByUserId(userId: number): Promise<AxiosResponse<IPost[]>>{
        return api.get<IPost[]>(`/posts/user/${userId}`)
    }
}