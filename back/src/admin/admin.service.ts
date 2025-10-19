import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminService {
    constructor(private jwtService: JwtService, @InjectModel("requests") private readonly RequestsTable, @InjectModel("furniture") private readonly FurnitureTable, @InjectModel("users") private readonly UsersTable, @InjectModel("admins") private readonly AdminsTable) { }
    async createFurniture(res, furDetails) {
        try {
            await this.FurnitureTable.create(furDetails)
            res.status(200).json({
                message: "Furniture created successfully",
                success: true
            })
        } catch (error) {
            res.status(500).json({
                message: "Cant't create furniture",
                success: false,
                error: error.message
            })
        }
    }
    async getAllUsers(res) {
        try {
            const users = await this.UsersTable.find().populate("orders.ordered_furniture_id")
            return res.status(200).json({
                data: users,
                success: true,
            })
        } catch (error) {
            return res.status(500).json({
                message: "Can't fetch users",
                success: false,
                error: error.message
            })
        }
    }
    async CreateAdmin(res, userDetail) {
        try {
            const target = await this.AdminsTable.findOne({
                email: userDetail.email
            })
            if (target) {
                return res.status(400).json({
                    message: "You have already registered",
                    success: false
                })
            }
            const newUser = new this.AdminsTable({
                username: userDetail.username,
                password: await bcrypt.hash(userDetail.password, 10),
            })
            await newUser.save()
            return res.status(200).json({
                message: "You have subscribed! Please verify your email.",
                success: true
            })
        } catch (error) {
            return res.status(500).json({
                message: "Can't Create User, please try again!",
                success: false,
                erorr: error.message
            })
        }
    }
    async LoginUser(res, creds) {
        try {
            const target = await this.AdminsTable.findOne({ email: creds.email })
            if (target && await bcrypt.compare(creds.password, target?.password)) {
                const payload = {
                    sub: target._id,
                    role: target.role
                }
                return res.status(200).json({
                    access_token: await this.jwtService.signAsync(payload),
                    message: "Your authenticated!",
                    success: true
                })
            }
            return res.status(400).json({
                message: "Email or password not correct",
                success: false
            })
        } catch (error) {
            return res.status(500).json({
                message: "An error occured, please try again",
                error: error.message
            })
        }
    }
    async getAllRequests(res) {
        try {
            const furnitures = await this.RequestsTable.find()
                .populate("orderedBy")
                .populate("ordered_furniture");

            return res.status(200).json({
                data: furnitures,
                success: true
            })
        } catch (error) {
            return res.status(500).json({
                message: "An error occured, please try again",
                error: error.message
            })
        }
    }
}
