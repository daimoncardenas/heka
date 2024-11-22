import { IsNumber } from 'class-validator';

export class GeneralResponseQueriesFindAllDto {
  @IsNumber()
  totalPages: number;
  @IsNumber()
  currentPage: number;
  @IsNumber()
  count: number;
  @IsNumber()
  totalItems: number;
}
