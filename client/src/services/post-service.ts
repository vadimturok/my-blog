import api from "../http";
import {IPost} from "../types/post-type";
import {AxiosResponse} from "axios";
import {IComment} from "../types/comment-type";
import {IUser} from "../types/user-type";
import {ILike} from "../types/like-type";
import {PostPaginationResponse} from "../types/post-pagination-response";

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

    static async getAllByQuery(page: number, limit: number): Promise<AxiosResponse<PostPaginationResponse>>{
        return api.get<PostPaginationResponse>(`/posts/postsQuery?page=${page}&limit=${limit}`)
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

    static async getTodayPosts(quantity: number): Promise<AxiosResponse<IPost[]>>{
        return api.get<IPost[]>(`/posts/today?quantity=${quantity}`)
    }
    
    static async likePost(userId: number, postId: number): Promise<AxiosResponse<ILike>>{
        return api.post<ILike>('/likes', {userId, postId})
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

    static updatePostByLike(like: ILike, posts: IPost[]): IPost[]{
        return posts.map(post => {
            if(post.id === like.post.id){
                post.userLikes.push(like)
                return post
            }
            return post
        })
    }

    static orderByLikes(posts: IPost[]): IPost[]{
        return posts.sort((a,b) =>
            b.userLikes.length - a.userLikes.length)
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