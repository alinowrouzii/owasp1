import { Injectable } from '@nestjs/common';
import { TOTP } from 'otpauth';

@Injectable()
export class OtpService {
  generateOtp(paramss: { secret: string }): { otp: string } {
    const otpObject = this.getTotpObject(paramss.secret);
    const otp = otpObject.generate();
    return { otp };
  }

  verifyOtp(params: { secret: string; otp: string }): boolean {
    const otpObject = this.getTotpObject(params.secret);
    const delta = otpObject.validate({ token: params.otp, window: 1 });
    return delta !== null;
  }

  getTotpObject(secret: string) {
    return new TOTP({
      period: 30,
      digits: 6,
      algorithm: 'SHA-512',
      secret,
    });
  }
}
