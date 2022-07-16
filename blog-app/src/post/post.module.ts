import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {UserModule} from "../user/user.module";
import {PostService} from "./post.service";
import {PostController} from "./post.controller";
import {AuthorizationModule} from "../authorization/authorization.module";
import {FileService} from "../file/file.service";
import {TagModule} from "../tag/tag.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        UserModule,
        TagModule,
        AuthorizationModule
    ],
    providers: [PostService, FileService],
    controllers: [PostController],
    exports: [PostService]
})
export class PostModule {}
