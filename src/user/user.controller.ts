import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDTO } from "./user.dto";
import { User } from "./user.type";

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.users()
    }
    @Get('/:_id')
    async getuser(@Param('_id') _id: string): Promise<User> {
        return this.userService.singleUser(_id)
    }

    @Post()
    async createUser(@Body() data: UserDTO): Promise<User> {
        return this.userService.user(data)
    }

    @Put('/:_id')
    async updatedUser(@Param('_id') _id: string,@Body() data:UserDTO): Promise<User> {
        return this.userService.updateUser(_id,data)

    }

    @Delete('/:_id')
    async deletedUser(@Param('_id')_id:string):Promise<User>{
        return this.userService.deleteuser(_id)
    }


}