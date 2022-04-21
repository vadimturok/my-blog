import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UpdateUserDto{

    @IsNotEmpty()
    readonly userId: number;

    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;
}