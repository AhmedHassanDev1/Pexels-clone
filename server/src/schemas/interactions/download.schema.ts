import { Prop, Schema,SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose"; 
import { User } from "../user.schema";
import { Media } from "../media.schema";


@Schema({id:false})
export class Dimensions{
   @Prop({required:true})
   width:number

   @Prop({required:true})
   height:number
}
@Schema({timestamps:true,id:false})
export class Downloads{
   @Prop({type:Types.ObjectId,ref:User.name,required:true})
   user:Types.ObjectId
   
   @Prop({type:Types.ObjectId,ref:Media.name,required:true})
   media:Types.ObjectId
   
   @Prop({required:true})
   Dimensions:Dimensions
}

export let DownloadsSchema=SchemaFactory.createForClass(Downloads)


