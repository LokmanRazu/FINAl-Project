import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.type";
import { UserDTO } from "./user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    async users(): Promise<User[]> {
        return this.userModel.find()
    }

    user(userDTO:UserDTO):Promise<User>{
        const user = new this.userModel(userDTO)
        return user.save() ;
    }
}
