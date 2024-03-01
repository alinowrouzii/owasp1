import { Expose } from 'class-transformer';
import User from '../entities/user.entity';

export class UserDto {
  // only properties with @Expose() will be returned in the response
  @Expose()
  email: string;

  @Expose()
  full_name: string;

  static toUserDto(user: User): UserDto {
    const userDto = new UserDto();
    Object.assign(userDto, user);
    return userDto;
  }
}
