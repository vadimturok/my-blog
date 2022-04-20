export interface PostCreateResponse{
    id: number;
    title: string;
    text: string;
    user: number;
    postImage: string;
    dateAndTimePublish: Date;
    likes: number;
}