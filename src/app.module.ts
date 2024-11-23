import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [UsersModule, ProductsModule, NotificationsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
