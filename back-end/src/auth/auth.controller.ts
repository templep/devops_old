import { AuthService } from './auth.service';
import { Controller, Post, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    description: 'Users has been successfully logged.',
  })
  async login(@Request() request) {
    return this.service.login(request.body);
  }
}
