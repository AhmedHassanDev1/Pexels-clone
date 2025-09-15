import { Controller, Post, Body, Put, Res, HttpCode } from "@nestjs/common";
import { ChangePasswordDTO, CreateUserDTO, LoginDTO } from "./Auth.dto";
import { AuthServices } from "./auth.services";
import { Response } from "express";
import { cookiesSetting } from "src/constants/cookies.config";
import { Public } from "src/decorators/public.decorator";
import { minutes, Throttle } from "@nestjs/throttler";
import { User } from "src/schemas/user.schema";
import { CurrentUser } from "src/decorators/currentUser.decorator";

@Throttle({default:{limit:10,ttl:minutes(1),blockDuration:minutes(5),}})
@Public()
@Controller('/auth')
export class AuthControllers {
    constructor(private AuthServices: AuthServices) {
     
    }

    @Post('/register')
    async register(@Body() UserPayload: CreateUserDTO, @Res() res: Response) {
        let token = await this.AuthServices.register(UserPayload)
        res.cookie('access-token', token, cookiesSetting)
        res.status(201).json()
    }


    @Post('/login')
    async login(@Body() body: LoginDTO, @Res() res: Response) {
        let token = await this.AuthServices.Login(body)
        res.cookie('access-token', token, cookiesSetting)
        res.status(201).json()
    }

    @Put('/change-password')
    async resetPassword(@CurrentUser('_id') id ,@Body() body:ChangePasswordDTO ) {
          
    }
}
