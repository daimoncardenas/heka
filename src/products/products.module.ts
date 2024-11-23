import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService,NotificationsGateway],
  exports: [ProductsService, PrismaService,NotificationsGateway],
  imports: [NotificationsModule],
})
export class ProductsModule {}
