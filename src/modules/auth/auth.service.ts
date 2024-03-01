import { HttpException, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import User from './entities/user.entity';
import { OtpService } from '../otp/otp.service';
import { generateSecret } from 'src/common/utils/secret-generator';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
    private readonly otpService: OtpService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async register(registerDto: RegisterDto) {
    const secret = generateSecret();
    try {
      await this.userRepository.create(
        {
          email: registerDto.email,
          full_name: registerDto.full_name,
          secret,
        },
        {},
      );
    } catch (error) {
      console.error(error.name);
      // no need to throw error if user already exists. so attackers can't guess if a user exists or not by brute forcing
      if (error.name !== 'SequelizeUniqueConstraintError') {
        throw new HttpException({ message: 'Internal server error' }, 500);
      }
      console.log('user already exists');
    }

    return { message: 'activation link sent to your email. check your email' };
  }

  async sendOtp(params: { email: string }) {
    // use otp service to send otp
    const user = await this.userRepository.findOne({
      where: { email: params.email },
      rejectOnEmpty: false,
    });

    if (user) {
      const otp = this.otpService.generateOtp({ secret: user.secret });
      // send otp to user
      // this.smsService.sendOtp({ otp, email: user.email });
      console.log('sent otp', otp);
    }

    return { message: 'otp sent. check your email' };
  }

  async login(params: { email: string; otp: string }) {
    const user = await this.userRepository.findOne({
      where: { email: params.email },
      rejectOnEmpty: false,
    });

    if (user) {
      const secret = await user.secret;
      const isValid = this.otpService.verifyOtp({
        secret,
        otp: params.otp,
      });
      if (isValid) {
        return { message: 'logged in' };
      }
    }

    throw new HttpException({ message: 'Invalid email or otp' }, 401);
  }
}
