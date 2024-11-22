import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseAuthDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzQwMTg2NTliMDAyMjg0YTJmZDk5OTciLCJpYXQiOjE3MzIyODg5NjgsImV4cCI6MTczMjI5MjU2OH0.vm-ZgN57fwxvlFyyaACIpGdlsPul_RqM860H40_kGyI',
    description: 'token',
  })
  @IsEmail()
  token: string;
}
