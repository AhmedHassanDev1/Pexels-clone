import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose"
import { Types } from "mongoose"
import { Media } from "./media.schema"
import { User } from "./user.schema"


@Schema({timestamps:true})
export class Collection{
    @Prop()
    name:string
     
    @Prop({type:Types.ObjectId,ref:User.name})
     user:Types.ObjectId
     
     @Prop({type:[{type:Types.ObjectId,ref:Media.name}]})
     media:Types.ObjectId[]
     
     @Prop({default:0})
     photos_count:number

     @Prop({default:0})
     videos_count:number
}


export const CollectionSchema=SchemaFactory.createForClass(Collection)