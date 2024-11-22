import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsString } from 'class-validator';
import { STATUS } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @ApiProperty({ example: 'Product ID', description: 'Product ID' })
    @IsString()
    id: string;

    @ApiProperty({ example: 'Product Status', description: 'Product Status', required: false })
    @IsEnum(STATUS)
    status: STATUS
}
