import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        try{
            const authorizationHeader = request.headers.authorization
            const bearer = authorizationHeader.split(' ')[0]
            const token = authorizationHeader.split(' ')[1]

            if(bearer !== 'Bearer' || !token){
                console.log('here')
                throw new UnauthorizedException({message: 'User is unauthorized'})
            }
            request.user = this.jwtService.verify(token, {secret: process.env.ACCESS_SECRET})
            return true
        }catch(e){
            throw new UnauthorizedException({message: 'User is unauthorized'})
        }
    }

}