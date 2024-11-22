import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {

  @ApiProperty({ example: 'example@gmail.com', description: 'Email User' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'Password User' })
  @IsString()
  password: string;
}
