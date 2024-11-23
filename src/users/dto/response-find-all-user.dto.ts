import { GeneralResponseQueriesFindAllDto } from '../../common';
import { Users } from './users.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllUserResponseDto extends GeneralResponseQueriesFindAllDto {
  @ApiProperty({ example: '[{....}]', description: 'Array Users' })
  data: Users[];
}
