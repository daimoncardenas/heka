import {
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
  
  export class GeneralInputQueriesFindAllDto {
  
    @ApiProperty({ example: '10', description: 'Take' })
    @IsNumber()
    @Type(() => Number)
    take: number;
  
    @ApiProperty({ example: '0', description: 'Skip' })
    @IsNumber()
    @Type(() => Number)
    skip: number;
  
    @ApiProperty({ example: '....', description: 'Search Name', required: false })
    @IsString()
    @IsOptional()
    search?: string;
  
    @ApiProperty({ example: '2023-11-17', description: 'Start date', required: false })
    @IsString()
    @IsOptional()
    start?: string;
  
    @ApiProperty({ example: '2024-11-22', description: 'End date', required: false })
    @IsString()
    @IsOptional()
    end?: string;
  }