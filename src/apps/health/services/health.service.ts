import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorFunction,
  HealthIndicatorResult,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { LoggerService } from '@logger/services';
import { EnvironmentVariables } from '@config/types';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  private readonly memoryLimit: number;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
  ) {
    this.memoryLimit = this.configService.getOrThrow<number>(
      'HEALTH_CHECK_MEMORY_HEAP_LIMIT',
    );
  }

  check(): Promise<HealthCheckResult> {
    this.logger.debug(
      LoggerService.createLogEntry('Checking health status', {
        memoryLimit: this.memoryLimit,
      }),
    );

    const indicatorFunctions: HealthIndicatorFunction[] = [
      () => this.memoryHeapCheck(),
    ];

    return this.health.check(indicatorFunctions);
  }

  private async memoryHeapCheck(): Promise<HealthIndicatorResult> {
    return this.memory.checkHeap('memory_heap', this.memoryLimit);
  }
}
