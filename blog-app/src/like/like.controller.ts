import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {LikeService} from "./like.service";
import {LikeDto} from "./dto/like.dto";
import {AuthGuard} from "../authorization/auth.guard";

@Controller('likes')
export class LikeController{
    constructor(private likeService: LikeService) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async likePost(@Body() likeDto: LikeDto){
        return await this.likeService.likePost(likeDto)
    }
}