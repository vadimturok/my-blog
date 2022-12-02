import {IComment} from "./comment-type";
import {IUser} from "./user-type";
import {ILike} from "./like-type";
import {ITag} from "./tag-type";

export interface IPost{
    id: number;
    title: string;
    text: string;
    dateAndTimePublish: Date;
    postImage: string;
    comments: IComment[];
    userLikes: ILike[];
    tags: ITag[];
    user: IUser;
}