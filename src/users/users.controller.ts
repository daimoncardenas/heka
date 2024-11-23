import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUserInputDto } from './dto/input-find-all-user.dto';
import { FindAllUserResponseDto } from './dto/response-find-all-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Users } from './dto/users.dto';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //? Create a new user

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: Users,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return await this.usersService.create(createUserDto);
  }

  //? Find all users

  @Get('find-all')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users returned correctly.',
    type: FindAllUserResponseDto,
  })
  async findAll(
    @Query() input: FindAllUserInputDto,
  ): Promise<FindAllUserResponseDto> {
    return await this.usersService.findAll(input);
  }

  //? Find one user

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Find one user' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: Users,
  })
  async findOne(@Param('id') id: string): Promise<Users> {
    return await this.usersService.findOne(id);
  }

  //? Update a user

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    type: Users,
  })
  async update(@Body() updateUserDto: UpdateUserDto): Promise<Users> {
    return this.usersService.update(updateUserDto);
  }

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  } */
}
