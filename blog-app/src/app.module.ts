import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import { UserModule } from './user/user.module';
import {User} from "./user/user.entity";
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import {UserService} from "./user/user.service";
import { SecurityModule } from './security/security.module';
import { TokenModule } from './token/token.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { FileModule } from './file/file.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { LikeModule } from './like/like.module';
import * as path from "path";
import {TagModule} from "./tag/tag.module";



@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [],
          synchronize: true,
          autoLoadEntities: true
      }),
      UserModule,
      PostModule,
      CommentModule,
      SecurityModule,
      TokenModule,
      AuthorizationModule,
      FileModule,
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static')
      }),
      LikeModule,
      TagModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
    constructor(private connection: Connection) {
        console.log(connection.isConnected)

    }
}
