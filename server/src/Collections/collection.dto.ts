import { Exclude, Expose } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";


export class CollectionBodyDto {

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    user: string

    @IsArray()
    media: string[]

    @IsString()
    media_type: string
}


export class CollectionResponseDto {
    @IsString()
    _id: string

    @IsString()
    name: string

    @IsString()
    user: string

    @Exclude()
    media: string[]

    @IsString()
    media_type: string

    @Exclude()
    createdAt: Date

    @Exclude()

    updatedAt: Date

    @IsString()
    photos_count: number

    @IsString()
    videos_count: number
}   