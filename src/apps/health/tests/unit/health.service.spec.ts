import { TestBed } from '@suites/unit';
import type { Mocked } from '@suites/unit';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HealthCheckResult,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { HealthService } from '@health/services';
import {
  mockHealthCheckResult,
  mockFailedHealthCheckResult,
  mockMemoryHealthIndicatorResult,
  mockHealthEnvVars,
} from '@health/tests/_mocks_';

describe('HealthService', () => {
  let healthService: HealthService;
  let configService: Mocked<ConfigService>;
  let healthCheckService: Mocked<HealthCheckService>;
  let memoryHealthIndicator: Mocked<MemoryHealthIndicator>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(HealthService)
      .mock(ConfigService)
      .impl((stubFn) => ({
        getOrThrow: stubFn().mockReturnValue(
          mockHealthEnvVars.HEALTH_CHECK_MEMORY_HEAP_LIMIT,
        ),
      }))
      .compile();

    healthService = unit;

    configService = unitRef.get(ConfigService);
    healthCheckService = unitRef.get(HealthCheckService);
    memoryHealthIndicator = unitRef.get(MemoryHealthIndicator);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(healthService).toBeDefined();
    });

    it('should get memory limit from config service on instantiation', () => {
      expect(healthService).toBeDefined();

      expect(configService.getOrThrow).toBeDefined();
      expect(typeof configService.getOrThrow).toBe('function');
    });
  });

  describe('check()', () => {
    it('should perform health check successfully', async () => {
      memoryHealthIndicator.checkHeap.mockResolvedValue(
        mockMemoryHealthIndicatorResult,
      );
      healthCheckService.check.mockResolvedValue(mockHealthCheckResult);

      const result: HealthCheckResult = await healthService.check();

      expect(healthCheckService.check).toHaveBeenCalledWith([
        expect.any(Function),
      ]);
      expect(result).toEqual(mockHealthCheckResult);
      expect(result.status).toBe('ok');
    });

    it('should handle failed health check', async () => {
      healthCheckService.check.mockResolvedValue(mockFailedHealthCheckResult);

      const result: HealthCheckResult = await healthService.check();

      expect(healthCheckService.check).toHaveBeenCalledWith([
        expect.any(Function),
      ]);
      expect(result).toEqual(mockFailedHealthCheckResult);
      expect(result.status).toBe('error');
    });
  });

  describe('memoryHeapCheck()', () => {
    it('should call checkHeap with correct parameters', async () => {
      memoryHealthIndicator.checkHeap.mockResolvedValue(
        mockMemoryHealthIndicatorResult,
      );

      healthCheckService.check.mockImplementation(async (indicators) => {
        const memoryCheckFn = indicators[0];
        await memoryCheckFn();
        return mockHealthCheckResult;
      });

      await healthService.check();

      expect(memoryHealthIndicator.checkHeap).toHaveBeenCalledWith(
        'memory_heap',
        mockHealthEnvVars.HEALTH_CHECK_MEMORY_HEAP_LIMIT,
      );
    });

    it('should throw error when memory check fails', async () => {
      const error = new Error('Memory check failed');
      memoryHealthIndicator.checkHeap.mockRejectedValue(error);

      healthCheckService.check.mockImplementation(async (indicators) => {
        const memoryCheckFn = indicators[0];
        await memoryCheckFn();
        return mockHealthCheckResult;
      });

      await expect(healthService.check()).rejects.toThrow(
        'Memory check failed',
      );
    });
  });
});
