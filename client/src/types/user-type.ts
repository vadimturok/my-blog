import {IPost} from "./post-type";

export interface IUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profilePicture: string;
    posts: IPost[];
}