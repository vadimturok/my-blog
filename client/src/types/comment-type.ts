import {IUser} from "./user-type";
import {IPost} from "./post-type";

export interface IComment{
    id: number;
    text: string;
    dateAndTimePublish: Date;
    user: IUser;
    post: IPost;
}