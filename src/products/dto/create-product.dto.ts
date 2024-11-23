import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProductDto {

  @ApiProperty({ example: 'Product Name', description: 'Product Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Product Description', description: 'Product Description', required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: "1000", description: 'Product Price' })
  @IsString()
  price: bigint
}
