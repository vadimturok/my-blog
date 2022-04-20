import {IsNotEmpty, IsNumber, IsString, MaxLength, MinLength} from "class-validator";

export class CommentDto{

    @IsString()
    @MinLength(7, {message: 'Minimum length of comment must be 7'})
    readonly text: string;

    @IsNotEmpty()
    @IsNumber()
    readonly postId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;
}