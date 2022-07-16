import {IsNotEmpty, IsString} from "class-validator";

export class TagDto{

    @IsString({message: 'Name must be string'})
    @IsNotEmpty()
    readonly name: string;

    @IsString({message: 'Description must be string'})
    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly color: string;
}