import { Prop, Schema,SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose"; 
import { User } from "../user.schema";
import { Media } from "../media.schema";


@Schema({timestamps:true,id:false})
export class Views{
   @Prop({type:Types.ObjectId,ref:User.name,required:true})
   user:Types.ObjectId
   
   @Prop({type:Types.ObjectId,ref:Media.name,required:true})
   media:Types.ObjectId
   
}

export let ViewsSchema=SchemaFactory.createForClass(Views)


