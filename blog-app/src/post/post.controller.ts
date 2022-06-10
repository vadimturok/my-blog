import {
    Body,
    Controller, Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post, Put,
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
import {UpdatePostDto} from "./dto/update.post.dto";

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

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Put()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))
    async update(@UploadedFiles() files, @Body() post: UpdatePostDto){
        return this.postService.updatePost(post, files)
    }

    @UseGuards(AuthGuard)
    @Delete('/post/:postId')
    async delete(@Param('postId', new ParseIntPipe()) postId: number){
        await this.postService.deletePost(postId)
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
    getPaginatedPosts(@Query('page') page, @Query('limit') limit){
        return this.postService.paginate({page, limit})
    }

}