import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";

import { User, UserSchema } from "./user.type"
import { UserDTO } from "./user.dto";
import { userMiddleware } from "./user.middleware";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports: [MongooseModule.forFeatureAsync([
        {
            name: User.name,
            useFactory: () => {
                return UserSchema
            }
        }
    ]),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<any>('JWT_SECRET'),
            signOptions: { expiresIn: '15m' }
        }),
        inject: [ConfigService]
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
        UserDTO
    ],
    controllers: [UserController],
    providers: [UserService,JwtStrategy],
    exports: [UserModule]

})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(userMiddleware).forRoutes('users')
    }


}