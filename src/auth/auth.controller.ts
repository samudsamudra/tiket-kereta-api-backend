import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // Prefix untuk endpoint
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Endpoint POST /auth/register
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login') // Endpoint POST /auth/login
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
