import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [NotificationsGateway, NotificationsService, PrismaService],
  exports: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
