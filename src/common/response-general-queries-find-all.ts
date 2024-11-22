import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GeneralResponseQueriesFindAllDto {

  @ApiProperty({ example: '7', description: 'Total Pages' })
  @IsNumber()
  totalPages: number;

  @ApiProperty({ example: '1', description: 'Current Page' })
  @IsNumber()
  currentPage: number;

  @ApiProperty({ example: '1', description: 'Exist register' })
  @IsNumber()
  count: number;

  @ApiProperty({ example: '10', description: 'Total Items' })
  @IsNumber()
  totalItems: number;
}
