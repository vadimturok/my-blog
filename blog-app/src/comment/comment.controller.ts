import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {CommentService} from "./comment.service";
import {CommentDto} from "./dto/comment.dto";
import {AuthGuard} from "../authorization/auth.guard";

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentController{
    constructor(private commentService: CommentService) {
    }

    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() commentDto: CommentDto){
        return this.commentService.createComment(commentDto)
    }

}