import { Module } from '@nestjs/common';
import {UserModule} from "../user/user.module";
import {TokenModule} from "../token/token.module";
import {SecurityService} from "./security.service";
import {SecurityController} from "./security.controller";
import {AuthorizationModule} from "../authorization/authorization.module";

@Module({
    imports: [
        UserModule,
        TokenModule,
        AuthorizationModule,
        UserModule,
    ],
    providers: [SecurityService],
    controllers: [SecurityController]
})
export class SecurityModule {}
