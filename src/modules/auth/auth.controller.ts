import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto } from './dto/send-otp';
import { Throttle } from '@nestjs/throttler';
import { RecaptchaGuard } from 'src/guards/recaptcha.guard';

@Throttle({
  medium: { limit: 5, ttl: 10000 },
  long: { limit: 10, ttl: 60000 },
})
@UseGuards(RecaptchaGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: RegisterDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('send-otp')
  sendOtp(@Body() body: SendOtpDto) {
    return this.authService.sendOtp(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
