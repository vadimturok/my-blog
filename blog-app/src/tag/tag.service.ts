import {Injectable} from "@nestjs/common";
import {TagDto} from "./dto/tag.dto";
import {Tag} from "./tag.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class TagService {
    constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {
    }

    async createTag(tagDto: TagDto): Promise<Tag>{
        const tag = new Tag()
        tag.name = tagDto.name
        tag.description = tagDto.description
        tag.color = tagDto.color
        return this.tagRepository.save(tag)
    }

    async deleteTag(tagId: number){
        await this.tagRepository.delete(tagId)
    }

    async findById(tagId: number){
        return this.tagRepository.findOne(tagId)
    }

    async getAll(): Promise<Tag[]>{
        return this.tagRepository.find()
    }
}