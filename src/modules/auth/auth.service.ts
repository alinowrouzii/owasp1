import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import User from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
  ) {}
  async register(registerDto: RegisterDto) {
    const newUser = await this.userRepository.create(registerDto);

    const userDto = UserDto.toUserDto(newUser);
    return userDto;
  }

  async login() {
    // use otp service to verify user

    return 'login';
  }
}
