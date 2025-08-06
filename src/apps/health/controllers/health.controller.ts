import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';
import { HealthService } from '@health/services';

@SkipThrottle()
@Controller({
  version: '1',
  path: 'health',
})
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('check')
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.healthService.check();
  }
}
