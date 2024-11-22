import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { STATUS } from 'src/common';
import * as bcrypt from 'bcrypt';
import { Users } from './dto/users.dto';
import { FindAllUserInputDto } from './dto/input-find-all-user.dto';
import { FindAllUserResponseDto } from './dto/response-find-all-user.dto';
import { UserCreateError, UserNotFoundError, UserUpdateError } from './errors/usersErrors';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //? Create user

  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      //? Hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password: hashedPassword,
          status: STATUS.INACTIVE,
        },
      });

      if (!user) {
        throw new UserCreateError('User error to create');
      }

      return user;
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  //? Find all users

  async findAll(input:FindAllUserInputDto): Promise<FindAllUserResponseDto> {
    try{
      const { take, skip, search, end, start, status } = input;

      console.log(input);
      const where = {};

      if (status) {
        where['status'] = status;
      }

      if (start || end) {
        where['createdAt'] = {
          ...(start && { gte: new Date(start) }),
          ...(end && {
            lt: new Date(new Date(end).setDate(new Date(end).getDate() + 1)),
          }),
        };
      }

      if (search) {
        where['name'] = {
          contains: search,
          mode: 'insensitive',
        };
      }

      console.log('wherehere', where);
      const totalItems = await this.prisma.user.count({
        where,
      });

      const count = await this.prisma.user.count({});
      const totalPages = Math.ceil(totalItems / take);
      const currentPage = Math.ceil(skip / take) + 1;

      const users = await this.prisma.user.findMany({
        where,
        take,
        skip,
      });

      return {
        totalPages,
        currentPage,
        count: count ? 1 : 0,
        totalItems,
        data: users
      };
    } catch (e) {
      console.log(e);
      return e
    } finally {
      await this.prisma.$disconnect()
    }
  }

  //? Find one user

  async findOne(id: string): Promise<Users> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
        include:{
          Product:true
        }
      });

      if (!user) {
        throw new UserNotFoundError('User not found');
      }

      return user;
    } catch (e) {
      console.log(e);
      return e
    } finally {
      await this.prisma.$disconnect()
    }
  }

  //? Update user

  async update(updateUserDto: UpdateUserDto): Promise<Users> {
    try {
      //? Hash password
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);

      const user = await this.prisma.user.update({
        where: {
          id: updateUserDto.id,
        },
        data: {
          status: updateUserDto.status,
          name: updateUserDto.name,
          password: hashedPassword,
        },
      });

      if (!user) {
        throw new UserUpdateError('User error to update');
      }

      return user;
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await this.prisma.$disconnect();
    }
  }


/* 
  remove(id: number) {
    return `This action removes a #${id} user`;
  } */
}
