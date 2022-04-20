import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class LoginUserDto{

    @IsNotEmpty()
    @Matches('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$','',{message: 'Invalid email'})
    @IsString()
    readonly email: string;


    @MinLength(6, {message: 'Minimum length of password must be 6'})
    @MaxLength(20, {message: 'Maximum length of password is 20'})
    @IsString()
    readonly password: string;
}