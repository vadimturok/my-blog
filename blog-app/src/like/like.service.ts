import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "../comment/commnet.entity";
import {Repository} from "typeorm";
import {Like} from "./like.entity";
import {LikeDto} from "./dto/like.dto";
import {PostService} from "../post/post.service";
import {UserService} from "../user/user.service";

@Injectable()
export class LikeService{
    constructor(@InjectRepository(Like) private likeRepository: Repository<Like>,
                private postService: PostService,
                private userService: UserService) {
    }

    async likePost(likeDto: LikeDto){
        const like = new Like()
        like.user = likeDto.userId
        like.post = likeDto.postId
        const newLike =  await this.likeRepository.save(like)
        return await this.likeRepository.findOne(newLike.id, {relations: ['post']})
    }
}