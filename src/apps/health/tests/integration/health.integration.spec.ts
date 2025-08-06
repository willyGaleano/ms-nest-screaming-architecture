import { TestBed } from '@suites/unit';
import type { Mocked } from '@suites/unit';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { HealthController } from '@health/controllers';
import { HealthService } from '@health/services';
import {
  mockMemoryHealthIndicatorResult,
  mockHealthEnvVars,
  mockHealthCheckResult,
} from '@health/tests/_mocks_';

describe('Health Integration Tests', () => {
  let healthController: HealthController;
  let configService: Mocked<ConfigService>;
  let memoryHealthIndicator: Mocked<MemoryHealthIndicator>;
  let healthCheckService: Mocked<HealthCheckService>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.sociable(HealthController)
      .expose(HealthService)
      .mock(ConfigService)
      .impl((stubFn) => ({
        getOrThrow: stubFn().mockReturnValue(
          mockHealthEnvVars.HEALTH_CHECK_MEMORY_HEAP_LIMIT,
        ),
      }))
      .mock(MemoryHealthIndicator)
      .impl((stubFn) => ({
        checkHeap: stubFn().mockResolvedValue(mockMemoryHealthIndicatorResult),
      }))
      .mock(HealthCheckService)
      .impl((stubFn) => ({
        check: stubFn().mockResolvedValue(mockHealthCheckResult),
      }))
      .compile();

    healthController = unit;

    configService = unitRef.get(ConfigService);
    memoryHealthIndicator = unitRef.get(MemoryHealthIndicator);
    healthCheckService = unitRef.get(HealthCheckService);
  });

  beforeEach(() => {
    memoryHealthIndicator.checkHeap.mockResolvedValue(
      mockMemoryHealthIndicatorResult,
    );
    healthCheckService.check.mockResolvedValue(mockHealthCheckResult);
  });

  describe('Controller ↔ Service Integration', () => {
    it('should integrate controller with real health service successfully', async () => {
      const result: HealthCheckResult = await healthController.check();

      expect(result).toEqual(
        expect.objectContaining({
          status: expect.stringMatching(/^(ok|error|shutting_down)$/) as string,
          info: expect.any(Object) as object,
          error: expect.any(Object) as object,
          details: expect.any(Object) as object,
        }),
      );

      expect(healthCheckService.check).toHaveBeenCalledWith(
        expect.arrayContaining([expect.any(Function)]),
      );
    });

    it('should propagate memory check calls through the integration', async () => {
      await healthController.check();

      expect(healthCheckService.check).toHaveBeenCalledWith(
        expect.arrayContaining([expect.any(Function)]),
      );
    });

    it('should handle errors through the entire integration chain', async () => {
      const error = new Error('Memory check failed in integration');
      healthCheckService.check.mockRejectedValue(error);

      await expect(healthController.check()).rejects.toThrow(
        'Memory check failed in integration',
      );
    });

    it('should maintain configuration consistency across integration', async () => {
      expect(configService.getOrThrow).toHaveBeenCalledWith(
        'HEALTH_CHECK_MEMORY_HEAP_LIMIT',
      );

      await healthController.check();

      expect(healthCheckService.check).toHaveBeenCalledWith(
        expect.arrayContaining([expect.any(Function)]),
      );
    });
  });
});
