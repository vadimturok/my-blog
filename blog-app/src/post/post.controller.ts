import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Query,
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
        return this.postService.createPost(postDto, files)
    }

    @Get('/post/:postId')
    getPostById(@Param('postId', new ParseIntPipe()) postId: number){
        return this.postService.getPostById(postId)
    }

    @Get()
    getAllPosts(){
        return this.postService.getAllPosts()
    }

    @Get('/today?')
    getTodayPosts(@Query('quantity') quantity: number){
        return this.postService.getTodayPosts(quantity)
    }

    @Get('/postsQuery?')
    getPaginatedPosts(@Query('page') page: number = 1, @Query('limit') limit: number = 4){
        return this.postService.paginate({page, limit})
    }

}