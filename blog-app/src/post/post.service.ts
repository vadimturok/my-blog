import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {Repository} from "typeorm";
import {PostDto} from "./dto/post.dto";
import {UserService} from "../user/user.service";
import {FileService} from "../file/file.service";
import {Like} from "../like/like.entity";

@Injectable()
export class PostService{
    constructor(@InjectRepository(Post) private postRepository: Repository<Post>,
                private usersService: UserService,
                private fileService: FileService) {
    }

    async createPost(postDto: PostDto, files): Promise<Post>{
        const {picture} = files
        if(!picture){
            throw new HttpException('Image not provided', HttpStatus.BAD_REQUEST)
        }
        const picturePath = await this.fileService.createFile(picture[0])
        const post = new Post()
        post.title = postDto.title
        post.text = postDto.text
        post.user = Number(postDto.userId)
        post.postImage = picturePath
        post.dateAndTimePublish = new Date();
        await this.postRepository.save(post)
        return this.getPostById(post.id)
    }

    async getAllPosts(): Promise<Post[]>{
        return await this.postRepository.find({
            relations: ['comments', 'userLikes']
        })
    }

    async getPostById(postId: number): Promise<Post>{
        const post = await this.postRepository.findOne(postId, {
            relations: ['comments', 'userLikes']
        })
        if(post){
            return post
        }else{
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
        }
    }

    async getTodayPosts(quantity: number) {
        return this.postRepository.find({
            order: {dateAndTimePublish: 'DESC'},
            take: quantity
        })
    }
}