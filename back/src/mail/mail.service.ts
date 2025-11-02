import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',

        tls: {
            rejectUnauthorized: false
        }
        ,
        auth: {
            user: 'melcraftinteriors@gmail.com',
            pass: process.env.MailPassword,
        },
    });

    async sendVerificationEmail(to: string, token: string) {
        const verificationLink = `http://localhost:4000/users/verify_email/${token}`;
        await this.transporter.sendMail({
            from: '"MelCraft" melcraftinteriors@gmail.com',
            to,
            subject: 'Email Verification',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
        });
    }
    async sendProductRequestMail(customer) {
        try {
            await this.transporter.sendMail({
                from: '"MelCraft Interiors" <melcraftinteriors@gmail.com>',
                to: "melcraftinteriors@gmail.com",
                subject: "New Product Request Received",
                text: `A new furniture request has been submitted.\n\nCustomer Email: ${customer.email}\nPhone Number: ${customer.phone}\n\nPlease review the request in your dashboard.`,
            });

            console.log("Product request email sent successfully.");
        } catch (error) {
            console.error("Failed to send product request email:", error);
        }
    }
    async sendMailToUsers(emails: string[], category: string) {
        for (const email of emails) {
            const namePart = email.split('@')[0];

            await this.transporter.sendMail({
                from: '"MelCraft Interiors" <melcraftinteriors@gmail.com>',
                to: email,
                subject: 'New Product Alert!',
                html: `
  <p>Dear <strong>${namePart}</strong>,</p>
  <p>We are excited to inform you that a new product in the <strong>${category}</strong> category has just been posted!</p>
  <p>Visit <a href="https://melcraftinteriors.com">melcraftinteriors.com</a> to view more!</p>
  <br>
  <p>Best regards,<br>MelCraft Interiors Team</p>
`,

            });
        }
    }

}
