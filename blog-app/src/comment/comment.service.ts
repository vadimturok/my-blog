import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "./commnet.entity";
import {Repository} from "typeorm";
import {CommentDto} from "./dto/comment.dto";
import {UserService} from "../user/user.service";
import {PostService} from "../post/post.service";

@Injectable()
export class CommentService{
    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {
    }

    async createComment(commentDto: CommentDto): Promise<Comment>{
        const comment = new Comment();
        comment.text = commentDto.text
        comment.user = commentDto.userId
        comment.post = commentDto.postId
        comment.dateAndTimePublish = new Date()
        const newComment = await this.commentRepository.save(comment)
        return this.commentRepository.findOne({id: newComment.id},{
            relations: ['user', 'post']
        })
    }
}