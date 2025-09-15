import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserServices } from "./user.services";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { ImageProcessingServices } from "src/services/imageProcessing.services";
import { UploadService } from "src/upload/upload.services";
import { Media, MediaSchema } from "src/schemas/media.schema";
import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bullmq";
import { Follow, FollowSchema } from "src/schemas/interactions/follow.schema";
import { IsFollowInterceptor } from "./interceptors/isFollow.interceptor";

@Module({
   providers: [UserServices, ImageProcessingServices, UploadService,IsFollowInterceptor],
   controllers: [UserController],
   exports: [
      UserServices,
      
   ],
   imports: [
      HttpModule,
      MongooseModule.forFeature([{
         name: User.name,
         schema: UserSchema
      },
       {
         name: Media.name,
         schema: MediaSchema
      },
      {
         name:Follow.name,
         schema:FollowSchema
      }
      ]),
      BullModule.registerQueue({
         name: 'image',
      }),
      BullModule.registerQueue({
         name: 'video',
      }),
   ],
   
})
export class UserModule { }