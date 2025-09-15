
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Queue } from 'bullmq';
import { v2 as Uploader } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Model } from 'mongoose';
import { Media } from 'src/schemas/media.schema';
import { PublishBodyDTO } from './upload.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Media.name) private readonly MediaModel: Model<Media>,
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    @InjectQueue('image') private imageQueue: Queue,
    @InjectQueue('video') private videoQueue: Queue,

  ) { }

  async uploadSingleFile(file: Buffer, fileType: 'image' | 'video' = 'image'): Promise<UploadApiResponse | UploadApiErrorResponse> {

    try {
      const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
        Uploader.uploader.upload_stream({
          resource_type: fileType,
        }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        }).end(file)
      })
      return uploadResult
    } catch (error) {
      throw new Error(error)
    }

  }

  async DeleteFileByPublicId(public_id: string) {
    await Uploader.uploader.destroy(public_id)
  }
  async UploadMedia(id: string, file: Express.Multer.File) {
    let mimetype:string=file.mimetype
    let type=mimetype.split('/')[0] as "image" | "video"

    
    let res = await this.uploadSingleFile(file.buffer,type)
     

    let content = {
      user: id,
      type: res.resource_type,
      url: res.secure_url,
      details: {
        width: res.width,
        height: res.height,
      },
      storage: {
        public_id: res.public_id,
        format: res.format,
        size_bytes: res.bytes
      }
    }
    let doc = new this.MediaModel(content)
    await doc.save()
    this.UserModel.updateOne({_id:id},{$inc:{"statistics.assets_count":1}})
    return doc

  }

  async Publish(doc_id: string, body: PublishBodyDTO): Promise<void> {
    let doc = await this.MediaModel.findById(doc_id)
    if (!doc) throw new NotFoundException('not found this media')
    await this.MediaModel.updateOne({ _id: doc_id }, {
      $set: {
        ...body,
        status: 'processing'
      }
    })
     
    await doc.save()
    if (doc.type === 'image') {
      this.imageQueue.add('analyze-image', { id: doc._id, url: doc.url })

    } else if (doc.type == "video") {
      this.videoQueue.add('analyze-video', { id: doc._id, url: doc.url })
      

    }

  }

}