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

    async singleUser(_id:string):Promise<User>{
        return this.userModel.findById(_id)

    }

   async user(userDTO:UserDTO):Promise<User>{
        const user = new this.userModel(userDTO)
        return user.save() ;
    }

    async updateUser(_id:string,userDTO:UserDTO):Promise<User>{
        return this.userModel.findByIdAndUpdate(_id,userDTO)
    }

    async deleteuser(_id:string):Promise<User>{
        return this.userModel.findByIdAndDelete(_id)
    }

}
