import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";
import { UploadService } from "./upload.services";
import { UploadController } from "./upload.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Media, MediaSchema } from "src/schemas/media.schema";
import { BullModule } from "@nestjs/bullmq";
import { ImageProcessor } from "src/processors/image.processor";
import { ImageProcessingServices } from "src/services/imageProcessing.services";
import { VideoProcessingServices } from "src/services/VideoProcessing.services";
import { VideoProcessor } from "src/processors/video.processor";
import { User, UserSchema } from "src/schemas/user.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            {
            name: Media.name,
            schema: MediaSchema
        },
        {
            name:User.name,
            schema:UserSchema
        }
    ]),

        BullModule.registerQueue({
            name: 'image',
        }),
        BullModule.registerQueue({
            name: 'video',
        }),
    ],
    controllers: [
        UploadController
    ],
    providers: [
        {
            provide: 'CLOUDINARY',
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return cloudinary.config({
                    cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
                    api_key: configService.get<string>('CLOUDINARY_API_KEY'),
                    api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
                    secure: true
                });
            },
        },

        UploadService,
        ImageProcessor,
        VideoProcessor,
        ImageProcessingServices,
        VideoProcessingServices

    ],

})

export class UploadModule { }