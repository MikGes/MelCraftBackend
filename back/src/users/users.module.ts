import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/Models/users';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { MailService } from 'src/mail/mail.service';
@Module({
    imports: [MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }])],
    controllers: [UsersController],
    providers: [UserService, MailService]
})
export class UsersModule { }
