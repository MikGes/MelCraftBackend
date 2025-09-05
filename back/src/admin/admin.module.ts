import { Module } from '@nestjs/common';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
