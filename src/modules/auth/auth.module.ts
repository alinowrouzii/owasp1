import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';
import { OtpModule } from '../otp/otp.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [OtpModule, CacheModule.register()],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders],
})
export class AuthModule {}
