import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guard/guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'heka-testing', //? Secret key for JWT
      signOptions: { expiresIn: '1h' }, //? Expiration time for JWT
    })
  ],
})
export class AuthModule {}
