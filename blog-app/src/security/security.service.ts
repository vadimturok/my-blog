import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {TokenService} from "../token/token.service";
import {UserDto} from "../user/dto/user.dto";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs'
import * as uuid from 'uuid'
import {LoginUserDto} from "../user/dto/login.user.dto";
import {User} from "../user/user.entity";

@Injectable()
export class SecurityService{
    constructor(private tokenService: TokenService,
                private userService: UserService) {
    }

    async registration(userDto: UserDto){
        const candidate = await this.userService.getByEmail(userDto.email)
        if(candidate){
            throw new HttpException(`User with email: ${userDto.email} already exists`, HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashedPassword})
        const tokens =  this.tokenService.generateTokens(user);
        await this.tokenService.saveToken(user.id, tokens.refreshToken)

        return{
            ...tokens,
            user : {...user, posts: []}
        }
    }

    async login(loginUserDto: LoginUserDto){
        const user = await this.userService.getByEmail(loginUserDto.email)
        if(!user){
            throw new HttpException(`User with email: ${loginUserDto.email} not found`, HttpStatus.NOT_FOUND)
        }
        const passwordMatch = await bcrypt.compare(loginUserDto.password, user.password)
        if(!passwordMatch){
            throw new HttpException('Password is invalid', HttpStatus.UNAUTHORIZED)
        }
        const tokens =  this.tokenService.generateTokens(user);
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return{
            ...tokens,
            user
        }
    }

    async logout(refreshToken: string){
        await this.tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw new HttpException('Token is not provided', HttpStatus.UNAUTHORIZED)
        }
        const userData = await this.tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await this.tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb){
            throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED)
        }
        const user = await this.userService.getById(tokenFromDb.user.id)
        const tokens =  this.tokenService.generateTokens(user);
        await this.tokenService.saveToken(user.id, tokens.refreshToken)

        return{
            ...tokens,
            user
        }
    }

}