import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { STATUS } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiProperty({ example: 'a587c9a5-1062-444b-878b-645f88bb42de', description: 'User ID' })
  @IsString()
  id: string;


  @ApiProperty({ example: 'ACTIVE', description: 'User Status', required: false })
  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;
}
