import { Controller, Get, Query,Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
    constructor(private statisticsService: StatisticsService) { }

    @Get('/:user_id/views')
    async getViewStats(
        @Param('user_id') userId: string,
        @Query('period') period: number
    ): Promise<any> {

        let stats = await this.statisticsService.getViewsStats(userId, period);
        return stats;
    }

    @Get('/:user_id/likes')
    async getLikesStats(
        @Param('user_id') userId: string,

        @Query('period') period: number
    ): Promise<any> {
        return await this.statisticsService.getLikesStats(userId, period);
    }

    @Get('/:user_id/downloads')
    async getDownloadsStats(
        @Param('user_id') userId: string,

        @Query('period') period: number
    ): Promise<any> {
        return await this.statisticsService.getDownloadsStats(userId, period);
    }

    @Get('/:user_id/followers')
    async getFollowersStats(
        @Param('user_id') userId: string,
        @Query('period') period: number
    ): Promise<any> {
        return await this.statisticsService.getFollowersStats(userId, period);
    }
}