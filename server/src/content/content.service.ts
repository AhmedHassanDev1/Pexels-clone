import { Injectable, NotFoundException, Options } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Media } from "src/schemas/media.schema";
import { MediaResponseDTO } from "./content.dto";
import { plainToInstance } from "class-transformer";
import { User } from "src/schemas/user.schema";


@Injectable()
export class ContentService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Media.name) private MediaModel: Model<Media>,
    ) { }

    async getContentById(id: string): Promise<MediaResponseDTO> {

        let content = await this.MediaModel.findById(id).lean()

        if (!content) throw new NotFoundException('This content is not available')

        return plainToInstance(MediaResponseDTO, {
            ...content,
            _id: content._id?.toString(),
            user: content.user?.toString(),
        })

    }

    async getHomeContent(userId: string, limit: number = 10, page: number = 1): Promise<MediaResponseDTO[]> {

        let content = await this.MediaModel.find({
            $and: [
                { user: { $ne: userId } },
                { status: { $ne: 'draft' } }
            ]
        })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean()

        let media = content.map(el => {
            return plainToInstance(MediaResponseDTO, el)
        })

        return media
    }

    async getVideos(userId: string, limit: number = 10, page: number = 1): Promise<MediaResponseDTO[]> {

        let content = await this.MediaModel.find({
            $and: [
                { user: { $ne: userId } },
                { type: 'video' },
                { status: { $ne: 'draft' } }
            ]
        })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean()

        let media = content.map(el => {
            return plainToInstance(MediaResponseDTO, el)
        })
        return media
    }

    async getUserGallery(CurrentUserId: string, userId: string, type: string | null, limit: number = 10, page: number = 1): Promise<MediaResponseDTO[]> {


        let content = await this.MediaModel.find({
            $and: [
                { user: userId },
                { type: type ? { $eq: type } : { $exists: true } },
                { status: CurrentUserId === userId ? { $exists: true } : { $ne: 'draft' } }
            ]
        })
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({createdAt:-1})
            .lean()
        

        let media = content.map(el => {
            return plainToInstance(MediaResponseDTO, el)
        })
        return media
    }

    async getUserHighlights(CurrentUserId, userId: string, limit: number = 10, page: number = 1): Promise<MediaResponseDTO[] | any> {


        let content = await this.UserModel.find({
            _id: { $eq: userId },
        })
            .populate({
                path: 'highlights',
                options: {
                    limit,
                    skip: (page - 1) * limit,
                },
            })
            .lean()

        let media = content.map(el => {
            return plainToInstance(MediaResponseDTO, el.highlights)
        })
        return media
    }

}

