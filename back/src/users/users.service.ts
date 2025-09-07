import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt'
import { MailService } from "src/mail/mail.service";
import { v4 as uuid } from 'uuid';
@Injectable()
export class UserService {
    constructor(@InjectModel('users') private readonly usersTable, private readonly mailService: MailService) { }
    async CreateUser(res, userDetail) {
        try {
            const target = await this.usersTable.findOne({
                email: userDetail.email
            })
            if (target) {
                return res.status(400).json({
                    message: "User already exists",
                    success: false
                })
            }
            const token = uuid()
            const newUser = new this.usersTable({
                fullname: userDetail.fullname,
                email: userDetail.email,
                password: await bcrypt.hash(userDetail.password, 10),
                verification_token: token
            })
            await this.mailService.sendVerificationEmail(userDetail.email, token)
            await newUser.save()
            return res.status(200).json({
                message: "User Created Successfully!, Please verify your email.",
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
    async VerifyEmail(res, verificationToken) {
        try {
            const target = await this.usersTable.findOne({ where: { token: verificationToken } });

            if (target) {
                target.email_verified = true;
                target.verification_token = ""
                await this.usersTable.save(target);
                return res.status(200).json({
                    message: "Your Email Is Verified Successfully!",
                    success: true
                })
            }
            return res.status(400).json({
                message: "Invalid Verification Code/Token",
                success: false
            })

        } catch (error) {
            return res.status(500).json({
                message: "Can't Verify Your Email, Please Try Again!",
                success: true
            })
        }

    }
}