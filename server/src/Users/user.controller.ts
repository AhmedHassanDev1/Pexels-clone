import { Controller, Query, Param, Get, Put, Body, ParseUUIDPipe, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, HttpStatus, Post, Delete } from "@nestjs/common";
import { EditeProfileDTO } from "./user.dto";
import { UserServices } from "./user.services";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageProcessingServices } from "src/services/imageProcessing.services";
import { FileSignatureValidator } from "src/validator/fileSignature.validator";
import { IsFollowInterceptor } from "./interceptors/isFollow.interceptor";


@Controller('/users')
export class UserController {
    constructor(
        private userServices: UserServices,
        // private uploader:Uploapd
    ) {
    }

    @Get('/me')
    async ME(@CurrentUser('_id') id: string) {
        let user = await this.userServices.getUserById(id)
        return user
    }
    @UseInterceptors(IsFollowInterceptor)
    @Get('/details/:id')
    async getDetails(@Param('id') id: string) {


        let user = await this.userServices.getUserById(id)


        return user
    }

    @Get('/statistics/:id')
    async getStatistics(@Param('id') id: string) {
        let statistics = this.userServices.getUserStatistics(id)
        return statistics
    }

    @Put('/change_image')
    @UseInterceptors(FileInterceptor('image'))
    async changeProfileImage(
        @CurrentUser("_id") id,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({
                    fileType: /jpg|png|webp|jpeg/,
                }),
                new FileSignatureValidator({})
            ],
            errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
            fileIsRequired: true
        })) Image: Express.Multer.File): Promise<{ url: string }> {

        let uploadResult = await this.userServices.UpdateProfileImage(id, Image.buffer)
        let { secure_url: url } = uploadResult

        return { url }
    }

    @Put('/edite')
    async editeUserDetails(@CurrentUser("_id") id, @Body() body: EditeProfileDTO) {

        let user = await this.userServices.editeProfile(id, body)
        return user
    }
    
    @Get('/leaderboard')
    async getLeaderboard(
        @CurrentUser("_id") currentUserId: string,
        @Query('limit') limit: number,
        @Query('page') page: number,
    ) {
        let leaderboard = await this.userServices.getLeaderboard(currentUserId, limit, page)
        return leaderboard
    }

    @Get('/followers/:user_id')
    async getFollowers() {

    }

    @Get('/followings/:user_id')
    async getfollowings() {

    }

    @Post('/follow/:user_id')
    async FollowUser(@CurrentUser("_id") currentUserId: string, @Param('user_id') userId: string) {
        await this.userServices.follow(userId, currentUserId)
    }

    @Delete('/unfollow/:user_id')
    async unFollowUser(@CurrentUser("_id") currentUserId: string, @Param('user_id') userId: string) {
        await this.userServices.unfollow(userId, currentUserId)
    }


}