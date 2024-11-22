import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsString } from 'class-validator';
import { STATUS } from 'src/common';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  id: string;

  @IsEnum(STATUS)
  status: STATUS;
}
