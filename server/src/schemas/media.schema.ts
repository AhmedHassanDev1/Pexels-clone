import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";



@Schema({ id: false })
class Thumbnail {
  //  snapshoot from video
  @Prop({ required: true })
  url: string

  @Prop({ required: true })
  public_id: string
}

@Schema({ id: false })
class Details {

  @Prop() width?: number;
  @Prop() height?: number;
  @Prop() camera?: string;
  @Prop() taken_at?: Date;
  @Prop() software?: string;
  @Prop() duration?: string;
  @Prop() fps?: number;
  
  @Prop({ enum: ['landscape', 'portrait', 'square'] })
  orientation?: string;
}

@Schema({ id: false })
class Storage {
  @Prop({ required: true, enum: ['cloudinary', 's3', 'local'], default: 'cloudinary' })
  provider: string;

  @Prop() public_id?: string;
  @Prop() bucket?: string;
  @Prop() size_bytes?: number;
  @Prop() format:string
}

@Schema({ timestamps: true })
export class Media {

  @Prop({ type: Types.ObjectId, ref: 'user' })
  user: Types.ObjectId;

  @Prop() url?: string;
  
  @Prop({ required: true, enum: ['image', 'video'], index: true })
  type: 'image' | 'video';
  
  @Prop({ trim: true })
  title?: string;

  @Prop({ type: [String], index: true })
  tags?: string[];
   
  @Prop({ trim: true })
  location?: string;

  @Prop()
  faces?: number[][];

  @Prop()
  primary_color?: number[]

  @Prop()
  colors?: number[][]

  @Prop({ type: Storage, required: true ,_id: false})
  storage: Storage;

  @Prop({ type: Details, required: true,_id:false })
  details: Details;
  
  @Prop({ default: 0 }) views: number;
  @Prop({ default: 0 }) downloads: number;
  @Prop({ default: 0 }) likes: number;

  
  @Prop({ type: Thumbnail })
  thumbnail?: Thumbnail
  
  @Prop({ enum: ['draft','processing', 'published'], default: 'draft' })
  status: string;


}

export const MediaSchema = SchemaFactory.createForClass(Media);

