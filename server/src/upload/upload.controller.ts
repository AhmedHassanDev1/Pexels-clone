import { Body, Controller, Param, ParseFilePipe, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { UploadService } from "./upload.services";
import { PublishBodyDTO } from "./upload.dto";

@Controller('/uploads')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async Upload(
        @CurrentUser('_id') id: string,
        @UploadedFile(new ParseFilePipe({
            validators: [],
            fileIsRequired: true
        })) File: Express.Multer.File
    ) {
        let doc = await this.uploadService.UploadMedia(id, File)
        return doc
    }

    @Put('/publish/:id') 
    async publish(
        @Param('id') id:string , 
        @Body() body :PublishBodyDTO 
    ) {
        let data=await this.uploadService.Publish(id,body)
        return data
    }
}

