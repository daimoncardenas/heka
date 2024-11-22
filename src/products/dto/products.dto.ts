import { IsDate, IsString } from 'class-validator';


export class Products {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  userId: string;

  @IsString()
  price: string

  @IsString()
  status: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
