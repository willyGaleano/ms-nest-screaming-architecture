import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ErrorResponse } from '@common/types';
import { FUNCTIONAL_ERROR_PREFIX } from '@common/constants';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const errorResponse = this.buildErrorResponse(exception);

    this.logException(errorResponse);

    response.status(errorResponse.statusCode).send({
      statusCode: errorResponse.statusCode,
      message: errorResponse.message,
      errorCode: errorResponse.errorCode,
    });
  }

  private buildErrorResponse(exception: unknown): ErrorResponse {
    if (exception instanceof HttpException)
      return this.httpExceptionBuildResponse(exception);

    if (exception instanceof Error)
      return this.genericErrorBuildResponse(exception);

    return this.unknownExceptionBuildResponse();
  }

  private httpExceptionBuildResponse(exception: HttpException): ErrorResponse {
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string')
      return { statusCode, message: exceptionResponse };

    const responseObj = exceptionResponse as Record<string, unknown>;

    if (this.isClassValidatorError(exceptionResponse))
      return {
        statusCode,
        message: Array.isArray(responseObj.message)
          ? responseObj.message.join(', ')
          : (responseObj.message as string),
      };

    if (this.isValidResponseHttpException(exceptionResponse))
      return {
        statusCode,
        message: responseObj.message as string,
        errorCode: responseObj.errorCode as string,
        cause: responseObj.description,
      };

    return {
      statusCode,
      message: 'Occurred an unexpected error',
    };
  }

  private genericErrorBuildResponse(exception: Error): ErrorResponse {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Occurred an unexpected error',
      details: `${exception.name} - ${exception.message}`,
      cause: exception.cause,
      stack: exception.stack,
    };
  }

  private unknownExceptionBuildResponse(): ErrorResponse {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };
  }

  private isValidResponseHttpException(errorResponse: object): boolean {
    const hasMessage =
      'message' in errorResponse && typeof errorResponse.message === 'string';

    const hasErrorCode =
      'errorCode' in errorResponse &&
      typeof errorResponse.errorCode === 'string' &&
      errorResponse.errorCode.startsWith(FUNCTIONAL_ERROR_PREFIX);

    return hasMessage && hasErrorCode;
  }

  private isClassValidatorError(errorResponse: object): boolean {
    return (
      'message' in errorResponse &&
      'error' in errorResponse &&
      (errorResponse as Record<string, unknown>).error === 'Bad Request'
    );
  }

  private logException(errorResponse: ErrorResponse): void {
    const { message, errorCode, ...restResponse } = errorResponse;

    if (!errorCode)
      this.logger.error({
        msg: message,
        errorInfo: {
          ...restResponse,
        },
      });
  }
}
