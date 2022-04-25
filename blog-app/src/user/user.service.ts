import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDto} from "./dto/user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {FileService} from "../file/file.service";


@Injectable()
export class UserService{
    constructor(@InjectRepository(User)private usersRepository: Repository<User>,
                private fileService: FileService) {
    }

    async createUser(userDto: UserDto | User): Promise<User>{
        return await this.usersRepository.save(userDto)
    }

    async updateUser(updateUserDto: UpdateUserDto, file){
        let picturePath
        if('picture' in file){
            const {picture} = file
            picturePath = await this.fileService.createFile(picture[0])
        }
        const firstName = updateUserDto.firstName
        const lastName = updateUserDto.lastName
        const email = updateUserDto.email
        if(picturePath){
            await this.usersRepository.update(updateUserDto.userId, {firstName, lastName, email, profilePicture: picturePath})
        }else{
            await this.usersRepository.update(updateUserDto.userId, {firstName, lastName, email})
        }

        return this.getById(updateUserDto.userId)
    }

    async getAllUsers(){
        return await this.usersRepository.find({
            relations: ['posts', 'comments']
        });
    }

    async getById(userId: number){
        return await this.usersRepository.findOne(userId, {
            relations: ['posts']
        })
    }

    async getByEmail(email: string){
        return await this.usersRepository.findOne({email: email}, {relations: ['posts']})
    }
}