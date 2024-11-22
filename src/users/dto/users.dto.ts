import { IsDate, IsEmail, IsString } from 'class-validator';


export class Users {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  status: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
