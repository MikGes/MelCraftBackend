import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }
    @Get("users")
    async getAllusers(@Res() res:Response) {
       await this.adminService.getAllusers(res)
    }
    @Post("createUser")
    async CreateUser(@Res() res: Response, @Body() userDetail: any) {
        await this.adminService.CreateAdmin(res, userDetail)
    }
    @Post("createFurniture")
    async CreateFurniture(@Res() res: Response, @Body() FurDetails) {
        await this.adminService.createFurniture(res, FurDetails)
    }
    // @Get('users')
    // async getAllUsers(@Res() res: Response) {
    //     await this.adminService.getAllUsers(res)
    // }
    @Post("createAdmin")
    async createAdmin(@Res() res, @Body() adminDetails) {
        await this.adminService.CreateAdmin(res, adminDetails)
    }
    @Post("/login")
    async LoginUser(@Res() res: Response, @Body() creds) {
        await this.adminService.LoginUser(res, creds)
    }
    @Get("getrequests")
    async GetRequests(@Res() res: Response) {
        await this.adminService.getAllRequests(res)
    }
    @Get("/getRecentActivities")
    async GetRecentActivities(@Res() res:Response){
        await this.adminService.getRecentActivities(res)
    }
}
