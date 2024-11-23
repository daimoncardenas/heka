import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  exports: [ProductsService, PrismaService],
  imports: [NotificationsModule],
})
export class ProductsModule {}
