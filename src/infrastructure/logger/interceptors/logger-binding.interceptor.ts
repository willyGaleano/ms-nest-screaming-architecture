import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { ContextStoreService } from '@context-store/services';
import { LoggerService } from '@logger/services';

@Injectable()
export class LoggerBindingInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: PinoLogger,
    private readonly contextStoreService: ContextStoreService,
  ) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const requestId = this.contextStoreService.getRequestId();
      const correlationId = this.contextStoreService.getCorrelationId();

      LoggerService.addPinoBinding(this.logger, correlationId, requestId);
    } catch (error) {
      this.logger.error(
        LoggerService.createLogEntry('Error adding Pino bindings', {}, error),
      );
    }

    return next.handle();
  }
}
