import {IsInt, IsNumber, IsString, Length, MaxLength, MinLength, IsNotEmpty} from "class-validator";

export class PostDto{

    @MinLength(10, {message: 'Minimum length of title must be 10'})
    @IsString({message: 'Title must be string'})
    readonly title: string;

    @MinLength(15, {message: 'Minimum length of text must be 15'})
    @IsString({message: 'Title must be string'})
    readonly text: string;


    @IsNotEmpty()
    readonly userId: number;
}

