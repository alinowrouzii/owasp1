import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorResponse = exception.getResponse() as any;
    console.log(errorResponse);
    const message = errorResponse.message
      ? Array.isArray(errorResponse.message)
        ? errorResponse.message[0]
        : errorResponse.message
      : errorResponse;

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
