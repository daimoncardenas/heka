import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';


export class Products {
  @ApiProperty({ example: '3c054e10-a5d0-4299-b085-ca6d3b57660c', description: 'Product ID' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Shirt XL', description: 'Product Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Promo', description: 'Product Description' })
  @IsString()
  description: string;

  @ApiProperty({ example: '3c054e10-a5d0-4299-b085-ca6d3b57660c', description: 'User ID' })
  @IsString()
  userId: string;

  @ApiProperty({ example: '12000000', description: 'Product Price' })
  @IsString()
  price: string

  @ApiProperty({ example: 'ACTIVE', description: 'Product Status' })
  @IsString()
  status: string;

  @ApiProperty({ example: '24-11-23', description: 'Product Created At' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '25-11-24', description: 'Product Updated At' })
  @IsDate()
  updatedAt: Date;
}
