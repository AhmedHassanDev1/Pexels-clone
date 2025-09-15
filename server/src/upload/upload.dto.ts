import { IsArray, IsString } from "class-validator";

export class PublishBodyDTO{
    
    @IsString() 
    title:string
    
    @IsArray() 
    tags:string[]

    @IsString() 
    location:string
}