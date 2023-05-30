import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";

import { User, UserSchema } from "./user.type"
import { UserDTO } from "./user.dto";
@Module({
    imports: [MongooseModule.forFeatureAsync([
        {
            name: User.name,
            useFactory: () => {
                return UserSchema
            }
        }
    ]),
        UserDTO
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserModule]

})
export class UserModule { }