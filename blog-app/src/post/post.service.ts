import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {createQueryBuilder, Repository} from "typeorm";
import {PostDto} from "./dto/post.dto";
import {UserService} from "../user/user.service";
import {FileService} from "../file/file.service";

@Injectable()
export class PostService{
    constructor(@InjectRepository(Post) private postRepository: Repository<Post>,
                private usersService: UserService,
                private fileService: FileService) {
    }

    async createPost(postDto: PostDto, picture): Promise<Post>{
        const picturePath = await this.fileService.createFile(picture)
        console.log('PICTUREPATH:', picture)
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
        const posts = await this.postRepository.find({
            relations: ['comments']
        })
        return posts
    }

    async getPostById(postId: number): Promise<Post>{
        const post = await this.postRepository.findOne(postId, {
            relations: ['comments']
        });
        return post
    }

    async getAllPostsByUserId(userId: number): Promise<Post[]>{
        const posts = await this.postRepository.find({
            where: {
                user: userId
            }
        })
        return posts
    }

    async likePost(postId: number){
        const result = await this.postRepository.increment({id: postId}, 'likes', 1);
        return result
    }

    async getTodayPosts(quantity: number) {
        return this.postRepository.find({
            order: {dateAndTimePublish: 'DESC'},
            take: quantity
        })
    }
}