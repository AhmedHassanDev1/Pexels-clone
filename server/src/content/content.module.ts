import { Module } from "@nestjs/common";
import { ContentService } from "./content.service";
import { ContentController } from "./content.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Media, MediaSchema } from "src/schemas/media.schema";
import { User, UserSchema } from "src/schemas/user.schema";
import { Likes, LikesSchema } from "src/schemas/interactions/likes.schema";
import { IsLikeInterceptor } from "./interceptors/isLike.interceptor";


@Module({
    controllers:[ContentController],
    providers:[ContentService,IsLikeInterceptor],
    imports:[
        MongooseModule.forFeature([
            {
                name:Media.name,
                schema:MediaSchema
            },
            {
                name:User.name,
                schema:UserSchema
            },
            {
                name:Likes.name,
                schema:LikesSchema
            }
        ])
    ]
})
export class ContentModule{}
