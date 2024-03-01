import { IsEmail, IsNumberString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNumberString()
  @MinLength(6)
  @MaxLength(6)
  otp: string;
}
