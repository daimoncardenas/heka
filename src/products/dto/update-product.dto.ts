import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsString } from 'class-validator';
import { STATUS } from 'src/common';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    id: string;

    @IsEnum(STATUS)
    status: STATUS
}
