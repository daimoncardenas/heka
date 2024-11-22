import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString } from 'class-validator';


export class Users {

  @ApiProperty({ example: 'a587c9a5-1062-444b-878b-645f88bb42de', description: 'User ID' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Name User' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'johnDoe@gmail.com', description: 'Email User' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ACTIVE', description: 'User Status' })
  @IsString()
  status: string;

  @ApiProperty({ example: '24-11-23', description: 'User Created At' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '25-11-24', description: 'User Updated At' })
  @IsDate()
  updatedAt: Date;
}
