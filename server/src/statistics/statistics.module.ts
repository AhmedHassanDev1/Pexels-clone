import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from 'src/schemas/interactions/follow.schema';
import { Views, ViewsSchema } from 'src/schemas/interactions/view.schema';
import { Downloads, DownloadsSchema } from 'src/schemas/interactions/download.schema';
import { Likes, LikesSchema } from 'src/schemas/interactions/likes.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name:Follow.name,
                schema:FollowSchema
            },
            {
                name:Views.name,
                schema:ViewsSchema 
            },
            {
                name:Downloads.name,
                schema:DownloadsSchema
            },
            {
                name:Likes.name,
                schema:LikesSchema
            }
        ])
    ],
    controllers: [StatisticsController],
    providers: [StatisticsService],
})
export class StatisticsModule {}