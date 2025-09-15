import { Prop, Schema,SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose"; 
import { User } from "../user.schema";



@Schema({timestamps:true,id:false})
export class Follow{
   @Prop({type:Types.ObjectId,ref:User.name,required:true})
   follower:Types.ObjectId
   
   @Prop({type:Types.ObjectId,ref:User.name,required:true})
   user:Types.ObjectId
   
}

export let FollowSchema=SchemaFactory.createForClass(Follow)


