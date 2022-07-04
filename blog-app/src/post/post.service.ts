import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {Repository} from "typeorm";
import {PostDto} from "./dto/post.dto";
import {UserService} from "../user/user.service";
import {FileService} from "../file/file.service";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {UpdatePostDto} from "./dto/update.post.dto";
const _ = require('lodash');

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

    async updatePost(updatePostDto: UpdatePostDto, files){
        const postId = updatePostDto.postId
        let {title, text, postImage} = updatePostDto
        if(files){
            const {picture} = files
            postImage = await this.fileService.createFile(picture[0])
        }
        await this.postRepository.update(postId, {title, text, postImage})
        return this.getPostById(postId)
    }

    async deletePost(postId: number){
        await this.postRepository.delete(postId)
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

    async getLatestPosts(){
        return this.postRepository.find({
            relations: ['comments', 'userLikes'],
            order: {
                dateAndTimePublish: 'DESC'
            }
        })
    }

    async getHotPosts(){
        const posts = await this.postRepository.find({
            relations: ['comments', 'userLikes'],
        })
        return _.orderBy(posts, post => post.comments.length, ['desc'])
    }

    async getTopPosts(){
        const posts = await this.postRepository.find({
            relations: ['comments', 'userLikes'],
        })
        return _.orderBy(posts, post => post.userLikes.length, ['desc'])
    }

    async getPostsByUserId(userId: number){
        const posts = await this.postRepository.find({
            relations: ['comments', 'userLikes'],
            where: {
                user: userId
            }
        })
        return posts
    }
}