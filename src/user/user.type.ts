import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from "mongoose"

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true, trim: true })
    name: string

    @Prop({ required: true, unique: true, trim: true })
    email: string

    @Prop({ required: true, trim: true, minlength: 8 })
    password: string
}
export const UserSchema = SchemaFactory.createForClass(User);

