import {
    Body,
    Controller,
    Get, HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {PostService} from "./post.service";
import {PostDto} from "./dto/post.dto";
import {AuthGuard} from "../authorization/auth.guard";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostController{
    constructor(private postService: PostService) {
    }

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))
    create(@UploadedFiles() files ,@Body() postDto: PostDto){
        console.log('CREATE')
        console.log('DTO:', postDto)
        const {picture} = files
        if(!picture){
            throw new HttpException('Image not provided', HttpStatus.BAD_REQUEST)
        }
        return this.postService.createPost(postDto, picture[0])
    }

    @Get('/post/:postId')
    getPostById(@Param('postId', new ParseIntPipe({errorHttpStatusCode: HttpStatus.BAD_REQUEST})) postId: number){
        return this.postService.getPostById(postId)
    }

    @Get()
    getAllPosts(){
        return this.postService.getAllPosts()
    }

    @Get('/:userId')
    getPostsByUserId(@Param('userId') userId: number){
        return this.postService.getAllPostsByUserId(userId)
    }

    @UseGuards(AuthGuard)
    @Post('/:postId')
    likePost(@Param('postId') postId: number){
        return this.postService.likePost(postId);
    }

}