import {IUser} from "./user-type";


export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    user: IUser;
}