import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from 'src/schemas/collection.schema';
import { User } from 'src/schemas/user.schema';
import { CollectionBodyDto, CollectionResponseDto } from './collection.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name) private readonly collectionModel: Model<Collection>,
    ) { }

    async getCollections(user_id: string, offset: number, limit: number): Promise<CollectionResponseDto[]> {
        let collections = await this.collectionModel.find({ user: user_id })
            .skip((offset - 1) * limit)
            .limit(limit)
            .lean().exec();
        return plainToInstance(CollectionResponseDto, collections);

    }
    async getCollectionMedia(collection_id: string, offset: number, limit: number) {
        let collection = await this.collectionModel.findById(collection_id)
            .populate('media')
            .lean()
            .exec();

        return collection?.media || [];

    }

    async createCollection(collection: CollectionBodyDto) {
        let { media_type } = collection;
        delete collection.media_type;
        let updatedCollection = {
            ...collection,
            photos_count: media_type === "photo" ? collection.media.length : 0,
            videos_count: media_type === "video" ? collection.media.length : 0
        }
        const newCollection = new this.collectionModel(updatedCollection);

        return await newCollection.save();

    }

    async deleteCollection(collection_id: string) {
        return await this.collectionModel.findByIdAndDelete(collection_id);
    }

    async addMediaToCollection(collection_id: string, media_id: string) {
        return await this.collectionModel.findByIdAndUpdate(collection_id, { $push: { media_id: media_id } }, { new: true });
    }

    async removeMediaFromCollection(collection_id: string, media_id: string) {
        return await this.collectionModel.findByIdAndUpdate(collection_id, { $pull: { media_id: media_id } }, { new: true });
    }

}