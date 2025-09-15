import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Downloads } from 'src/schemas/interactions/download.schema';
import { Follow } from 'src/schemas/interactions/follow.schema';
import { Likes } from 'src/schemas/interactions/likes.schema';
import { Views } from 'src/schemas/interactions/view.schema';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectModel(Follow.name) private followModel: Model<Follow>,
        @InjectModel(Likes.name) private likeModel: Model<Likes>,
        @InjectModel(Downloads.name) private downloadModel: Model<Downloads>,
        @InjectModel(Views.name) private viewsModel: Model<Views>
    ) { }

    async getViewsStats(userId: string, period?: number): Promise<any> {
        let startDate: number = Date.now() - period * 24 * 60 * 60 * 1000
        let endDate: number = Date.now();


        const aggregate = await this.viewsModel.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: period ? { $gte: new Date(startDate), $lte: new Date(endDate) } : { $exists: true }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: "$_id",
                    _id: 0,
                    count: 1
                }
            }
        ]);

        return aggregate
    }

    async getLikesStats(userId: string, period?: number): Promise<any> {
        let startDate: number = Date.now() - (period ?? 0) * 24 * 60 * 60 * 1000;
        let endDate: number = Date.now();

        const aggregate = await this.likeModel.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: period ? { $gte: new Date(startDate), $lte: new Date(endDate) } : { $exists: true }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: "$_id",
                    _id: 0,
                    count: 1
                }
            }
        ]);

        return aggregate;
    }

    async getDownloadsStats(userId: string, period?: number): Promise<any> {
        let startDate: number = Date.now() - (period ?? 0) * 24 * 60 * 60 * 1000;
        let endDate: number = Date.now();

        const aggregate = await this.downloadModel.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: period ? { $gte: new Date(startDate), $lte: new Date(endDate) } : { $exists: true }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: "$_id",
                    _id: 0,
                    count: 1
                }
            }
        ]);

        return aggregate;
    }

    async getFollowersStats(userId: string, period?: number): Promise<any> {
        let startDate: number = Date.now() - (period ?? 0) * 24 * 60 * 60 * 1000;
        let endDate: number = Date.now();

        const aggregate = await this.followModel.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: period ? { $gte: new Date(startDate), $lte: new Date(endDate) } : { $exists: true }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },

                }
            },
            {
                $project: {
                    date: "$_id",
                    _id: 0,
                    count: 1
                }
            }
        ]);

        return aggregate;
    }
}