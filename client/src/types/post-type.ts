import {IComment} from "./comment-type";
import {IUser} from "./user-type";

export interface IPost{
    id: number;
    title: string;
    text: string;
    dateAndTimePublish: Date;
    likes: number;
    postImage: string;
    comments: IComment[];
    user: IUser;
}