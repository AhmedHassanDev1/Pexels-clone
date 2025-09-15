import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    first_name: string

    @IsOptional()
    @IsString()
    last_name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string


}

export class TokenPayloadDTO {
    @IsNotEmpty()
    @IsString()
    _id: any

    @IsNotEmpty()
    @IsString()
    first_name: string

    @IsOptional()
    @IsString()
    last_name: string

    @IsEmail()
    email: string





}

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string
}

export class ChangePasswordDTO{
     password:string
}