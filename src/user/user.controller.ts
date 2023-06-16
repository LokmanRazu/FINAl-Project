import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { LoginDTO, UserDTO } from "./user.dto";
import { User } from "./user.type";
import { AuthGuard } from "@nestjs/passport";

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    @ApiSecurity("JWT-auth")
    @UseGuards(AuthGuard())
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

    @Post('/login')
    login(@Body() data:LoginDTO):{}{
        return this.userService.login(data)
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