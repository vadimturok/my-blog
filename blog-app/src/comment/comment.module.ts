import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Comment} from "./commnet.entity";
import {UserModule} from "../user/user.module";
import {PostModule} from "../post/post.module";
import {CommentService} from "./comment.service";
import {CommentController} from "./comment.controller";
import {AuthorizationModule} from "../authorization/authorization.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
        UserModule,
        PostModule,
        AuthorizationModule
    ],
    providers: [CommentService],
    controllers: [CommentController]
})
export class CommentModule {}
