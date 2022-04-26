import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Like} from "./like.entity";
import {UserModule} from "../user/user.module";
import {PostModule} from "../post/post.module";
import {UserService} from "../user/user.service";
import {PostService} from "../post/post.service";
import {LikeService} from "./like.service";
import {LikeController} from "./like.controller";
import {AuthorizationModule} from "../authorization/authorization.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Like]),
        UserModule,
        PostModule,
        AuthorizationModule
    ],
    providers: [LikeService],
    controllers: [LikeController]
})
export class LikeModule {}
