import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FurnitureSchema } from 'src/Models/furniture';
import { UsersSchema } from 'src/Models/users';
import { AdminsSchema } from 'src/Models/admins';
import { RequestsModel } from 'src/Models/requests';
import { MailService } from 'src/mail/mail.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'requests', schema: RequestsModel }, { name: 'furniture', schema: FurnitureSchema }, { name: 'users', schema: UsersSchema }, { name: 'admins', schema: AdminsSchema }])],
  providers: [AdminService, MailService, AuthGuard],
  controllers: [AdminController]
})
export class AdminModule { }
