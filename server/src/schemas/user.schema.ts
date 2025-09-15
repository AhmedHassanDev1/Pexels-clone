import { Prop, Virtual, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PlatformsDefaultValue, statisticsDefaultValue } from 'src/constants/defaultValues';
import { Media } from './media.schema';

export type UserDocument = User & Document;



@Schema({ _id: false })
export class Platform {
  @Prop({ enum: ['x', 'tiktok', 'youtube', 'instagram'] })
  platform: string

  @Prop()
  url: string
}

@Schema({ _id: false })
export class Statistics {

  @Prop({ min: 0, default: 0 })
  views_count: number

  @Prop({ min: 0, default: 0 })
  likes_count: number

  @Prop({ min: 0, default: 0 })
  downloads_count: number


  @Prop({ min: 0, default: 0 })
  highlights_count: number

  @Prop({ min: 0, default: 0 })
  assets_count: number

  @Prop({ min: 0, default: 0 })
  followers_count: number

  @Prop({ min: 0, default: 0 })
  following_count: number


}


@Schema({ _id: false })
export class Image {
  @Prop({ required: true })
  public_id: string

  @Prop({ required: true })
  url: string

}
export const PlatformSchema = SchemaFactory.createForClass(Platform);

export const StatisticsSchema = SchemaFactory.createForClass(Statistics);

export const ImageSchema = SchemaFactory.createForClass(Image);

@Schema({ timestamps: true })
export class User {

  _id: Types.ObjectId

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string

  @Prop()
  location: string;

  @Prop()
  bio: string;

  @Prop({ type: [PlatformSchema], default: PlatformsDefaultValue })
  platforms: Platform[]


  @Prop({ type: StatisticsSchema, default: statisticsDefaultValue })
  statistics: Statistics

  @Prop({ type: ImageSchema })
  profile_image: Image

  @Prop({ type: [{ type: Types.ObjectId, ref: Media.name }] })
  media: [Types.ObjectId]

  @Prop([{ type: Types.ObjectId, ref: User.name }])
  follower: Types.ObjectId[]

  @Prop([{ type: Types.ObjectId, ref: User.name }])
  followings: Types.ObjectId[]

  @Prop({ type: [{ type: Types.ObjectId, ref: Media.name }] })
  highlights: [Types.ObjectId]

  @Prop()
  full_name: string

}

export const UserSchema = SchemaFactory.createForClass(User);



