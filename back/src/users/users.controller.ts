import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { UserService } from "./users.service";
import { Response } from "express";
@Controller("users")
export class UsersController {
    constructor(private readonly userService: UserService) { }
    @Post("createUser")
    async CreateUser(@Res() res: Response, @Body() userDetail: any) {
        await this.userService.CreateUser(res, userDetail)
    }
    @Get("verify_email/:token")
    async VerifyEmail(@Res() res: Response, @Param("token") emailToken) {
        await this.userService.VerifyEmail(res, emailToken)
    }
}