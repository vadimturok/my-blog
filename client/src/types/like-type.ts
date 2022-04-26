import {IUser} from "./user-type";
import {IPost} from "./post-type";

export interface ILike{
    id: number;
    user: IUser;
    post: IPost;
}