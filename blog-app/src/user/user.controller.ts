// import {Body, Controller, Get, Post} from "@nestjs/common";
// import {UserService} from "./user.service";
// import {UserDto} from "./dto/user.dto";

// @Controller('users')
// export class UserController{
//     constructor(private usersService: UserService) {
//     }
//
//     @Get()
//     getAll(){
//         return this.usersService.getAllUsers();
//     }
//
//     @Post()
//     create(@Body() userDto: UserDto){
//         return this.usersService.createUser(userDto);
//     }
// }