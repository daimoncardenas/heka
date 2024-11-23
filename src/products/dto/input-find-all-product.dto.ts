import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { GeneralInputQueriesFindAllDto, STATUS } from '../../common';

export class FindAllProductInputDto extends GeneralInputQueriesFindAllDto {

  @ApiProperty({ example: 'ACTIVE', description: 'Product Status', required: false })
  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;
}
