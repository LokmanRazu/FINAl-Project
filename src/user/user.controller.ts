import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDTO } from "./user.dto";
import { User } from "./user.type";

@Controller('user')
@ApiTags('user')
export class UserController{
    constructor(private readonly userService:UserService){}
    @Get()
    async getUsers(){
        return this.userService.users()
    }

    @Post('create')
    @ApiTags('usercreate')
    async createUser(@Body() data:UserDTO):Promise<User>{
        return this.userService.user(data)
    }
}