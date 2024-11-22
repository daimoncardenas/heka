import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class CreateUserDto {

    @ApiProperty({ example: 'John Doe', description: 'Name User' })
    @IsString()
    name:string

    @ApiProperty({ example: 'johnDoe@gmail.com', description: 'Email User' })
    @IsEmail()
    email:string
    
    @ApiProperty({ example: '1234567', description: 'Password User' })
    @IsString()
    password:string
}
