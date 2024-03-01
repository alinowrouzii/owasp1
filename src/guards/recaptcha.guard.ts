import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  private readonly recaptchaSecret: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.recaptchaSecret = this.configService.getOrThrow(
      'RECAPTCHA_SECRET_KEY',
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();
    console.log('recaptch guard');

    if (!body.recaptcha_value) {
      throw new HttpException('recaptcha_value value is required', 400);
    }

    const { data } = await firstValueFrom(
      this.httpService
        .post(
          `https://www.google.com/recaptcha/api/siteverify?response=${body.recaptcha_value}&secret=${this.recaptchaSecret}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw new HttpException('Internal server error', 500);
          }),
        ),
    );

    console.log('recaptcha', data);
    if (!data.success) {
      throw new ForbiddenException();
    }
    delete body.recaptcha_value;

    return true;
  }
}
