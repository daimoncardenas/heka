import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GeneralInputQueriesFindAllDto, STATUS } from 'src/common';

export class FindAllProductInputDto extends GeneralInputQueriesFindAllDto {
  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;
}
