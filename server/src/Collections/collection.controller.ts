import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionBodyDto, CollectionResponseDto } from './collection.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';

@Controller('collections')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) { }

    @Get()
    async getCollections(
        @CurrentUser("_id") user_id: string,
        @Query('offset', new DefaultValuePipe(1)) offset: number,
        @Query('limit', new DefaultValuePipe(10)) limit: number,

    ): Promise<CollectionResponseDto[]> {

        return await this.collectionService.getCollections(user_id, offset, limit);
    }
    @Get(':collection_id/media')
    async getCollectionMedia(
        @Param('collection_id') collection_id: string,
        @Query('offset', new DefaultValuePipe(1), ParseIntPipe) offset: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        return await this.collectionService.getCollectionMedia(collection_id, offset, limit);
    }    
    
    @Post()
    async createCollection(@CurrentUser("_id") id: string, @Body() body: CollectionBodyDto) {
        return await this.collectionService.createCollection({ ...body, user: id });

    }

    @Delete(':collection_id')
    async deleteCollection(@Param('collection_id') collection_id: string) {
        return await this.collectionService.deleteCollection(collection_id);
    }

    @Put(':collection_id/add/:media_id')
    async addMediaToCollection(@Param('collection_id') collection_id: string, @Param('media_id') media_id: string) {
        return await this.collectionService.addMediaToCollection(collection_id, media_id);
    }

    @Put(':collection_id/remove/:media_id')
    async removeMediaFromCollection(@Param('collection_id') collection_id: string, @Param('media_id') media_id: string) {
        return await this.collectionService.removeMediaFromCollection(collection_id, media_id);
    }

}