import { IsString, IsOptional, IsArray, IsNumber, IsEnum, IsObject, ValidateNested, IsBoolean } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { ImageProcessingServices } from 'src/services/imageProcessing.services';
// ✅ Thumbnail DTO
class ThumbnailDTO {
    @IsString()
    url: string;

    @IsString()
    public_id: string;
}

// ✅ Details DTO
class DetailsDTO {
    @IsOptional()
    @IsNumber()
    width?: number;

    @IsOptional()
    @IsNumber()
    height?: number;

    @IsOptional()
    @IsString()
    camera?: string;

    @IsOptional()
    taken_at?: Date;

    @IsOptional()
    @IsString()
    software?: string;

    @IsOptional()
    @IsString()
    duration?: string;

    @IsOptional()
    @IsNumber()
    fps?: number;

    @IsOptional()
    @IsEnum(['landscape', 'portrait', 'square'])
    orientation?: string;
}

// ✅ Storage DTO
class StorageDTO {
    @IsString()
    @IsEnum(['cloudinary', 's3', 'local'])
    provider: string;

    @IsOptional()
    @IsString()
    public_id?: string;

    @IsOptional()
    @IsString()
    bucket?: string;

    @IsOptional()
    @IsNumber()
    size_bytes?: number;

    @IsString()
    format: string;
}

// ✅ Media DTO
export class MediaResponseDTO {
    @IsString()
    _id: string; // ObjectId → string في الـ response

    @IsString()
    user: string; // ObjectId → string

    @IsOptional()
    @IsString()
    url?: string;

    @IsEnum(['image', 'video'])
    type: 'image' | 'video';

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsArray()
    tags?: string[];

    @IsOptional()
    @IsString()
    location?: string;

    @Exclude()
    faces?: number[][];

    @Transform(({ value }: { value: [number, number, number] }) => value.length ? ImageProcessingServices.rgbToHex(...value) : null)
    @IsOptional()
    primary_color?: number[];

    @IsOptional()
    @Transform(({ value }: { value: [number, number, number][] }) => {
        if(!value.length) return null
        return  value.map((el) => {
            return ImageProcessingServices.rgbToHex(...el)
        })  
    })
    colors?: number[][];

    @Exclude()
    storage: StorageDTO;

    @ValidateNested()
    @Type(() => DetailsDTO)
    details: DetailsDTO;

    @IsNumber()
    views: number;

    @IsNumber()
    downloads: number;

    @IsNumber()
    likes: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => ThumbnailDTO)
    thumbnail?: ThumbnailDTO;

    @IsEnum(['draft', 'processing', 'published'])
    status: string;

    @IsBoolean()
    is_like:boolean
}