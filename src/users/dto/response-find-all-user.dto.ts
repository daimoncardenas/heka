import { GeneralResponseQueriesFindAllDto } from 'src/common';
import { Users } from './users.dto';

export class FindAllUserResponseDto extends GeneralResponseQueriesFindAllDto {
  data: Users[];
}
