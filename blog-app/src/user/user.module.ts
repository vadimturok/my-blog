import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserService} from "./user.service";
import {FileModule} from "../file/file.module";
import {FileService} from "../file/file.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        FileModule
    ],
    providers: [UserService, FileService],
    controllers: [],
    exports: [UserService]
})
export class UserModule {}
