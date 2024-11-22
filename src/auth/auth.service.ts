import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    try {
      const { email, password } = authDto;
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const token = this.jwtService.sign({ sub: user.id });

      return { token };
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  findAll() {
    return `It´s necessary login to access this route`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
