import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt'
import { MailService } from "src/mail/mail.service";
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
    constructor(private jwtService: JwtService, @InjectModel("furniture") private readonly furniture, @InjectModel("request") private readonly requests, @InjectModel('users') private readonly usersTable, private readonly mailService: MailService) { }
    async CreateUser(res, userDetail) {
        try {
            const target = await this.usersTable.findOne({
                email: userDetail.email
            })
            if (target) {
                return res.status(400).json({
                    message: "You have already subscribed!",
                    success: false
                })
            }
            const token = uuid()
            const newUser = new this.usersTable({
                // fullname: userDetail.fullname,
                email: userDetail.email,
                // password: await bcrypt.hash(userDetail.password, 10),
                verification_token: token
            })
            await this.mailService.sendVerificationEmail(userDetail.email, token)
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
    async VerifyEmail(res, verificationToken) {
        try {
            const target = await this.usersTable.findOne({ verification_token: verificationToken });
            if (target) {
                target.email_verified = true;
                target.verification_token = ""
                await target.save();
                return res.status(200).json({
                    message: "Your Email Is Verified Successfully! You may now request products!",
                })
            }
            return res.status(400).json({
                message: "Invalid Verification Code/Token",
                success: false
            })

        } catch (error) {
            return res.status(500).json({
                message: "Can't Verify Your Email, Please Try Again!",
                error: error.message,
                success: false
            })
        }

    }
    async LoginUser(res, creds) {
        try {
            const target = await this.usersTable.findOne({ email: creds.email })
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
    async GetFurnitures(res) {
        try {
            const furnitures = await this.furniture.find()
            res.status(200).json({
                data: furnitures,
                success: true
            })
        } catch (error) {
            res.status(500).json({
                message: "Can't fetch furnitures, Please try again.",
                success: false
            })
        }
    }
    async OrderFurniture(res, furnitureId, customer) {
        try {
            const updatedUser = await this.usersTable.findOneAndUpdate(
                { email: customer.email },
                {
                    $addToSet: {
                        orders: {
                            ordered_furniture_id: furnitureId
                        }
                    }
                },
                { new: true }
            );

            // Check if user exists and is verified
            if (!updatedUser || !updatedUser.email_verified) {
                return res.status(404).json({
                    message: "We couldn't process your request. Please make sure you're subscribed and your email is verified. Thank you for your interest!"
                });
            }

            const newRequest = new this.requests({
                orderedBy: updatedUser._id,
                phoneNumber: customer.phone,
                fullName: customer.fullName,
                ordered_furniture: furnitureId
            });

            await this.mailService.sendProductRequestMail({
                email: customer.email,
                phone: customer.phone
            });

            await newRequest.save();

            return res.status(200).json({
                message: "Your furniture order has been received successfully. We appreciate your request!",
                success: true
            });

        } catch (error) {
            console.error("Error while processing furniture order:", error);
            return res.status(500).json({
                message: "Oops! Something went wrong while processing your request. Please try again later."
            });
        }
    }


}