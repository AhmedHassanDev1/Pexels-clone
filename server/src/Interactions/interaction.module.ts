import { Module } from "@nestjs/common";
import { InteractionsController } from "./interactions.controller";
import { InteractionsServices } from "./interactions.services";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { Likes, LikesSchema } from "src/schemas/interactions/likes.schema";
import { Views, ViewsSchema } from "src/schemas/interactions/view.schema";
import { Follow, FollowSchema } from "src/schemas/interactions/follow.schema";
import { Media, MediaSchema } from "src/schemas/media.schema";

@Module({
    providers: [InteractionsServices],
    controllers: [InteractionsController],
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: Likes.name,
                schema: LikesSchema
            },
            {
                name: Views.name,
                schema: ViewsSchema
            },
            {
                name: Follow.name,
                schema: FollowSchema
            },
            {
                name: Views.name,
                schema: ViewsSchema
            },
            {
                name: Media.name,
                schema: MediaSchema
            }
        ])
    ]
})
export class InteractionsModule { }