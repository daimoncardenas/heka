import { GeneralResponseQueriesFindAllDto } from '../../common';
import { Products } from './products.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllProductResponseDto extends GeneralResponseQueriesFindAllDto {
  @ApiProperty({ example: '[{....}]', description: 'Array Products' })
  data: Products[];
}
