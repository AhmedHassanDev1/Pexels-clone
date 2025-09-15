
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Job } from 'bullmq';
import { Model } from 'mongoose';
import { Media } from 'src/schemas/media.schema';
import { ImageProcessingServices } from 'src/services/imageProcessing.services';
import { v2 as Cloudinary } from 'cloudinary';


@Processor('image')
export class ImageProcessor extends WorkerHost {
    constructor(
        @InjectModel(Media.name) private readonly MediaModel: Model<Media>,
        private readonly imageProcessingServices: ImageProcessingServices,

    ) {
        super();
    }
    async process(job: Job<any, any, string>): Promise<any> {
        if (job.name === 'analyze-image') {
            let { id, url } = job.data
            let doc = await this.MediaModel.findById(id)
            let metadata = await Cloudinary.api.resource(doc.storage.public_id, {
                faces: true,
                exif: true
            })


            let res = await axios.get(url, { responseType: 'arraybuffer' })
            let fileAsBuffer = Buffer.from(res.data, 'binary');
            let { palette } = await this.imageProcessingServices.analyzeImage(fileAsBuffer)

            let orientation = this.imageProcessingServices.get_orientation(metadata.width, metadata.height)


            let Vibrant = palette.Vibrant.rgb
            let LightVibrant = palette.LightVibrant.rgb
            let DarkVibrant = palette.DarkVibrant.rgb
            let LightMuted = palette.LightMuted.rgb
            let DarkMuted = palette.DarkMuted.rgb
            let Muted = palette.Muted.rgb

            let primary_color = palette.Vibrant.rgb
            let secondaryColors = [Vibrant, DarkVibrant, LightVibrant, LightMuted, DarkMuted, Muted]
            


            let imageِِِAnalysisResult = {
                faces: metadata.faces || [],
                primary_color,
                colors: secondaryColors,
                status: 'published'
            }
          

            await this.MediaModel.updateOne({ _id: id }, { $set: imageِِِAnalysisResult })
            await this.MediaModel.updateOne(
                { _id: id },
                {
                    $set: {
                        "details.orientation": orientation
                    }
                })
                
            return imageِِِAnalysisResult
        }

        return {};
    }
}
