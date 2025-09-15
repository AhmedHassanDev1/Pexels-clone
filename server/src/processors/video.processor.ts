
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Job } from 'bullmq';
import { Model } from 'mongoose';
import { Media } from 'src/schemas/media.schema';
import { v2 as Cloudinary } from 'cloudinary';
import fs from "fs/promises"
import {dirname, join} from "path"

@Processor('video')
export class VideoProcessor extends WorkerHost {
    constructor(
        @InjectModel(Media.name) private readonly MediaModel: Model<Media>,
    ) {
        super();
    }
    async process(job: Job<any, any, string>): Promise<any> {
          
        if (job.name === 'analyze-video') {
           
     
        }

        return {};
    }
}
