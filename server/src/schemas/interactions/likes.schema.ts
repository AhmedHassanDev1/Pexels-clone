import { Prop, Schema,SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose"; 
import { User } from "../user.schema";
import { Media } from "../media.schema";


@Schema({timestamps:true})
export class Likes{

   @Prop({type:Types.ObjectId,ref:User.name,required:true})
   user:Types.ObjectId
   
   @Prop({type:Types.ObjectId,ref:Media.name,required:true})
   media:Types.ObjectId
   
}

export let LikesSchema=SchemaFactory.createForClass(Likes)



