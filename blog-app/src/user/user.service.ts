import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDto} from "./dto/user.dto";


@Injectable()
export class UserService{
    constructor(@InjectRepository(User)private usersRepository: Repository<User>) {
    }

    async createUser(userDto: UserDto): Promise<User>{
        const user = await this.usersRepository.save(userDto);
        return user;
    }

    async getAllUsers(){
        const users = await this.usersRepository.find({
            relations: ['posts','comments']
        });
        return users;
    }

    async getById(userId: number): Promise<User | null>{
        const user = await this.usersRepository.findOne(userId)
        return user
    }

    async getByEmail(email: string): Promise<User | null>{
        const user = await this.usersRepository.findOne({email: email})
        if(user){
            return user
        }else{
            return null
        }
    }
}