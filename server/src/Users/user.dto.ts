import { Type, Exclude, Transform } from "class-transformer";
import {
  IsNotEmpty, IsOptional, IsString,
  ValidateNested, IsEnum, IsUrl, IsInt, Min, IsMongoId, IsArray, IsEmail
} from "class-validator"





export class PlatformDto {
  @IsEnum(['x', 'tiktok', 'youtube', 'instagram'])
  platform: string;

  @IsUrl()
  url: string;
}

export class StatisticsDto {
  @IsInt() @Min(0)
  views_count: number;

  @IsInt() @Min(0)
  likes_count: number;

  @IsInt() @Min(0)
  downloads_count: number;

  @IsInt() @Min(0)
  highlights_count: number;

  @IsInt() @Min(0)
  assets_count: number;

  @IsInt() @Min(0)
  followers_count: number;

  @IsInt() @Min(0)
  following_count: number;
}


class PlatformDTO {
  @IsNotEmpty()
  @IsString()
  platform: string;

  @IsString()
  url: string;
}

export class ImageDto {
  @IsString()
  public_id: string;

  @IsUrl()
  url: string;
}
export class UserDto {
  @IsMongoId()
  _id: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @Exclude()
  password?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @ValidateNested({ each: true })
  @Type(() => PlatformDto)
  platforms: PlatformDto[];

  @ValidateNested()
  @Type(() => StatisticsDto)
  statistics: StatisticsDto;

  @ValidateNested()
  @Type(() => ImageDto)
  @Transform(({value})=>value?value?.url:null)
  profile_image: ImageDto;

  @Exclude()
  media: string[];

  @Exclude()
  follower: string[];

  @Exclude()
  followings: string[];

  @Exclude()
  highlights: string[];
  
  @IsString()
  full_name:string
  

}
export class EditeProfileDTO {
  @IsNotEmpty()
  @IsString()
  first_name: string

  @IsNotEmpty()
  @IsString()
  last_name: string

  @IsNotEmpty()
  @IsString()
  email: string

  @IsOptional()
  @IsString()
  bio: string

  @IsOptional()
  @IsString()
  location: string


  @ValidateNested({ each: true })
  @Type(() => PlatformDTO)
  platforms: PlatformDTO[]
  
  
}