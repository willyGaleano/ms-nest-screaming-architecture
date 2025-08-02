import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as os from 'os';
import { Params, PinoLogger } from 'nestjs-pino';
import { EnvironmentVariables } from '@config/types';
import { Environment } from '@config/enums';
import { LoggerDetail, LoggerMsg } from '@logger/types';
import { AppError } from '@common/types';
import { TrackingHeader } from '@common/enums';

export class LoggerService {
  static getConfigParams(
    configService: ConfigService<EnvironmentVariables>,
  ): Params {
    const appName = configService.getOrThrow<string>('APP_NAME');
    const currentEnvironment =
      configService.getOrThrow<Environment>('ENVIRONMENT');
    const logLevel = configService.getOrThrow<string>('LOG_LEVEL');
    const loggerMessageKey =
      configService.getOrThrow<string>('LOGGER_MESSAGE_KEY');
    const loggerTarget = configService.getOrThrow<string>('LOGGER_TARGET');
    const loggerErrorKey = configService.getOrThrow<string>('LOGGER_ERROR_KEY');

    return {
      pinoHttp: {
        name: appName,
        base: {
          hostname: os.hostname(),
        },
        level: logLevel,
        messageKey: loggerMessageKey,
        errorKey: loggerErrorKey,
        autoLogging: false,
        serializers: {
          req: () => undefined,
          res: () => undefined,
        },
        timestamp() {
          return `,"time":"${new Date(Date.now()).toISOString()}"`;
        },
        formatters: {
          level: (label) => ({ level: label }),
        },
        transport:
          currentEnvironment === Environment.LOCAL
            ? {
                target: loggerTarget,
                options: { colorize: true, loggerMessageKey },
              }
            : undefined,
      },
    };
  }

  static addPinoBinding(
    pinoLogger: PinoLogger,
    correlationId: string,
    requestId: string,
  ): void {
    const bindings = pinoLogger.logger.bindings();

    if (!bindings[TrackingHeader.X_CORRELATION_ID])
      pinoLogger.assign({
        [TrackingHeader.X_CORRELATION_ID]: correlationId,
      });

    if (!bindings[TrackingHeader.X_REQUEST_ID])
      pinoLogger.assign({
        [TrackingHeader.X_REQUEST_ID]: requestId,
      });
  }

  static createLogEntry(
    msg: string,
    detail?: LoggerDetail,
    error?: unknown,
  ): LoggerMsg {
    const errorInfo = error
      ? {
          message:
            error instanceof Error ? error.message : JSON.stringify(error),
          body:
            error instanceof Error
              ? undefined
              : LoggerService.extractErrorBody(error as AppError),
        }
      : undefined;

    return {
      msg,
      detail,
      errorInfo,
    };
  }

  private static extractErrorBody(error: AppError): unknown {
    if (error instanceof HttpException) return error.getResponse();

    return undefined;
  }
}
