import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Likes } from "src/schemas/interactions/likes.schema";
import { Views } from "src/schemas/interactions/view.schema";
import { Media } from "src/schemas/media.schema";
import { User } from "src/schemas/user.schema";

@Injectable()
export class InteractionsServices {
    constructor(
        @InjectModel(User.name) private UserModal: Model<User>,
        @InjectModel(Likes.name) private LikesModal: Model<Likes>,
        @InjectModel(Views.name) private ViewsModal: Model<Views>,
        @InjectModel(Media.name) private MediaModal: Model<Media>,


    ) { }

    async addLike(user: string, media_id: string) {

        try {
            let isLike = await this.LikesModal.exists({
                user,
                media: media_id
            })

            if (isLike) throw new ConflictException('User already liked this media.')

            await this.LikesModal.updateOne(
                { user, media: media_id },
                { $setOnInsert: { user, media: media_id } },
                { upsert: true }
            );

            await this.UserModal.updateOne({ _media_id: user }, { $inc: { "statistics.likes_count": 1 } })
            return { message: 'User added to likes.' }
        } catch (err) {
            throw new InternalServerErrorException(err.message || 'Like operation failed.');
        }
    }

    async RemoveLike(user: string, media_id: string) {
        try {
            let isLike = await this.LikesModal.exists({
                user,
                media: media_id
            })

            await this.LikesModal.deleteOne(
                { user, media: media_id },
            );

            if (isLike) await this.UserModal.updateOne({ _id: user }, { $inc: { "statistics.likes_count": -1 } })
            return { message: 'remove like is successed' }
        } catch (err) {
            throw new InternalServerErrorException(err.message || 'remove Like operation failed.');
        }
    }

    async View(user: string, media_id: string) {
        let isView = await this.ViewsModal.exists({
            user,
            media: media_id
        })
        let doc = await this.MediaModal.findById(media_id)


        if (!isView && doc.user) {
            this.ViewsModal.insertOne(
                { user, media: media_id }
            );
            let u = await this.UserModal.findByIdAndUpdate(
                doc.user
                ,
                { $inc: { "statistics.views_count": 1 } }
            )

        }
    }

    async addHighlight(user: string, media_id: string) {
        let isHighlight = await this.UserModal.findOne({ highlights: { $in: media_id } })


        await this.UserModal.updateOne(
            { _id: user },
            {
                $addToSet: { highlights: media_id },
                $inc: { "statistics.highlights_count": isHighlight ? 0 : 1 }
            }
        )
        return { message: "add to highlights is successed" }
    }
    async removeHighlight(user: string, media_id: string) {
        let isHighlight = await this.UserModal.findOne({ highlights: { $in: media_id } })

        await this.UserModal.updateOne(
            { _id: user },
            {
                $pull: { highlights: media_id },
                $inc: { "statistics.highlights_count": isHighlight ? -1 : 0 }
            }
        )
        return { message: "remove from highlights is successed" }

    }

}