import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards} from "@nestjs/common";
import {TagService} from "./tag.service";
import {TagDto} from "./dto/tag.dto";
import {AuthGuard} from "../authorization/auth.guard";


@Controller('tags')
export class TagController{

    constructor(private tagService: TagService) {
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() tagDto: TagDto){
        return this.tagService.createTag(tagDto)
    }

    @UseGuards(AuthGuard)
    @Delete('tag/:tagId')
    async delete(@Param('tagId', new ParseIntPipe())tagId: number){
        await this.tagService.deleteTag(tagId)
    }

    @Get('tag/:tagId')
    getTagById(@Param('tagId', new ParseIntPipe())tagId: number){
        return this.tagService.findById(tagId)
    }

    @Get()
    getAllTags(){
        return this.tagService.getAll()
    }
}