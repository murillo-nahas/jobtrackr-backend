import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() dto: RegisterDTO): Promise<{ access_token: string }> {
    return this.authenticationService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDTO): Promise<{ access_token: string }> {
    return this.authenticationService.login(dto);
  }
}
