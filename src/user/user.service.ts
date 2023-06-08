import { Injectable                                                                                                                                                                                                                                                                                      , UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.type";
import { LoginDTO, UserDTO } from "./user.dto";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService:JwtService) { }
    async users(): Promise<User[]> {
        return await this.userModel.find()
    }

    async singleUser(_id:string):Promise<User>{
        return await this.userModel.findById(_id)

    }

   async user(userDTO:UserDTO):Promise<User>{
        const user = new this.userModel(userDTO)
        const saltOrRounds = 10;
        const password = user.password
        const hash = await bcrypt.hash(password, saltOrRounds);
        user.password = hash
        return user.save() ;
    };

    //  Login

    async login(loginDTO:LoginDTO){
        let user = await this.userModel.findOne({email:loginDTO.email})
        if(!user){
            throw new UnauthorizedException()
        }
        let match = await bcrypt.compare(loginDTO.password,user.password)
        console.log("match_++++",match)
        if(!match){
            throw new UnauthorizedException()
        }
        const payload = {
            sub:user._id,
            name:user.name
        }
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }

    }

    async updateUser(_id:string,userDTO:UserDTO):Promise<User>{
        return await this.userModel.findByIdAndUpdate(_id,userDTO)
    }

    async deleteuser(_id:string):Promise<User>{
        return await this.userModel.findByIdAndDelete(_id)
    }

}
