import { IsEmail } from 'class-validator';

export class SendOtpDto {
  @IsEmail()
  readonly email: string;
}
