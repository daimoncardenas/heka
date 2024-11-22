import { GeneralResponseQueriesFindAllDto } from 'src/common';
import { Products } from './products.dto';

export class FindAllProductResponseDto extends GeneralResponseQueriesFindAllDto {
  data: Products[];
}
