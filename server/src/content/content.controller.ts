import { Controller, Get, Query, Param, UseInterceptors } from "@nestjs/common";
import { ContentService } from "./content.service";
import { MediaResponseDTO } from "./content.dto";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { IsLikeInterceptor } from "./interceptors/isLike.interceptor";

@UseInterceptors(IsLikeInterceptor)
@Controller('/content')
export class ContentController {
    constructor(
        private contentService: ContentService
    ) { }



    @Get('/home')
    async getHomeContent(
        @CurrentUser('_id') user_id: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<MediaResponseDTO[]> {

        let content = await this.contentService.getHomeContent(user_id,limit,page)
        return content

    }

    @Get('/videos')
    async getVideos(
        @CurrentUser('_id') user_id: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<MediaResponseDTO[]> {
        let content = await this.contentService.getVideos(user_id,limit,page)
        return content
    }
    
   
    @Get('/:user_id/gallery')
    async getUserGallery(
        @CurrentUser('_id') CurrentUserId,
        @Param('user_id') user_id,
        @Query('type') type: string | null,
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<MediaResponseDTO[]> {
        let content = await this.contentService.getUserGallery(CurrentUserId, user_id, type,limit,page)
        return content
    }

    @Get('/:user_id/highlights')
    async getUserHighlights(
        @CurrentUser('_id') CurrentUserId,
        @Param('user_id') user_id,
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        let content = await this.contentService.getUserHighlights(CurrentUserId, user_id,limit,page)
        return content
    }

    @Get('/:id')
    async getMediaById(@Param('id') id): Promise<MediaResponseDTO> {

        let content = await this.contentService.getContentById(id)
        return content
    }
}