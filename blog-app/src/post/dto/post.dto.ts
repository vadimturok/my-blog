import {IsInt, IsNumber, IsString, Length, MaxLength, MinLength, IsNotEmpty} from "class-validator";
import {Tag} from "../../tag/tag.entity";

export class PostDto{

    @MinLength(10, {message: 'Title is too short!'})
    @MaxLength(80, {message: 'Title is too long!'})
    @IsString({message: 'Title must be string'})
    readonly title: string;

    @MinLength(15, {message: 'Text is too short!'})
    @IsString({message: 'Title must be string'})
    readonly text: string;

    @IsNotEmpty()
    readonly userId: number;

    readonly tags?: any;
}

