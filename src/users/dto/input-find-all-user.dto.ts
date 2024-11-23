import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { GeneralInputQueriesFindAllDto, STATUS } from '../../common';

export class FindAllUserInputDto extends GeneralInputQueriesFindAllDto {

  @ApiProperty({ example: 'ACTIVE', description: 'User Status', required: false })
  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;
}
