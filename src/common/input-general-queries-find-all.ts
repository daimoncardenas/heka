import {
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class GeneralInputQueriesFindAllDto {
  
    @IsNumber()
    @Type(() => Number)
    take: number;
  
    @IsNumber()
    @Type(() => Number)
    skip: number;
  
    @IsString()
    @IsOptional()
    search?: string;
  
    @IsString()
    @IsOptional()
    start?: string;
  
    @IsString()
    @IsOptional()
    end?: string;
  }