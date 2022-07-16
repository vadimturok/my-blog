import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class UpdatePostDto{
    @MinLength(10, {message: 'Title is too short!'})
    @MaxLength(80, {message: 'Title is too long!'})
    @IsString({message: 'Title must be string'})
    title: string;

    @MinLength(15, {message: 'Text is too short!'})
    @IsString({message: 'Title must be string'})
    text: string;

    @IsNotEmpty({message: 'Empty post id'})
    postId: number;

    @IsNotEmpty({message: 'Empty image'})
    postImage: string;

    tags?: any;
}