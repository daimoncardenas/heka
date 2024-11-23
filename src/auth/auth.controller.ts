import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseAuthDto } from './dto/response-auth.dto';

@Controller('auth')
@ApiTags('Authentication Users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Authentication Users' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({
    status: 201,
    description: 'User authenticated successfully.',
    type: ResponseAuthDto
  })
  async login(@Body() authDto: AuthDto): Promise<ResponseAuthDto> {
    return await this.authService.login(authDto);
  }

}
