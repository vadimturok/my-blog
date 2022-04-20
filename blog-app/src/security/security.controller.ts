import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Req,
    Res, UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {SecurityService} from "./security.service";
import {UserDto} from "../user/dto/user.dto";
import {LoginUserDto} from "../user/dto/login.user.dto";
import {AuthGuard} from "../authorization/auth.guard";

@Controller('auth')
export class SecurityController{
    constructor(private securityService: SecurityService) {
    }

    @UsePipes(ValidationPipe)
    @Post('/register')
    async register(@Body() userDto: UserDto, @Res() res){
        const userData = await this.securityService.registration(userDto)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.json(userData)
    }

    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res){
        const userData = await this.securityService.login(loginUserDto)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.json(userData)
    }

    @UseGuards(AuthGuard)
    @Delete('/logout')
    async logout(@Req() req, @Res() res){
        const {refreshToken} = req.cookies
        if(!refreshToken){
            throw new HttpException('Logged out', HttpStatus.BAD_REQUEST)
        }
        await this.securityService.logout(refreshToken)
        res.clearCookie('refreshToken')
        res.sendStatus(HttpStatus.OK)
    }

    //@UseGuards(AuthGuard)
    @Get('/refresh')
    async refresh(@Req() req, @Res() res){
        const {refreshToken} = req.cookies
        const userData = await this.securityService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.json(userData)
    }

}