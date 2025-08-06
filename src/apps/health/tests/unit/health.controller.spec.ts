import { TestBed } from '@suites/unit';
import type { Mocked } from '@suites/unit';
import { HealthCheckResult } from '@nestjs/terminus';
import { HealthController } from '@health/controllers';
import { HealthService } from '@health/services';
import {
  mockHealthCheckResult,
  mockFailedHealthCheckResult,
} from '@health/tests/_mocks_';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthService: Mocked<HealthService>;

  beforeAll(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(HealthController).compile();

    healthController = unit;

    healthService = unitRef.get(HealthService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(healthController).toBeDefined();
    });
  });

  describe('check()', () => {
    it('should return health check result successfully', async () => {
      healthService.check.mockResolvedValue(mockHealthCheckResult);

      const result: HealthCheckResult = await healthController.check();

      expect(healthService.check).toHaveBeenCalledWith();
      expect(result).toEqual(mockHealthCheckResult);
      expect(result.status).toBe('ok');
    });

    it('should return failed health check result', async () => {
      healthService.check.mockResolvedValue(mockFailedHealthCheckResult);

      const result: HealthCheckResult = await healthController.check();

      expect(healthService.check).toHaveBeenCalledWith();
      expect(result).toEqual(mockFailedHealthCheckResult);
      expect(result.status).toBe('error');
    });

    it('should propagate errors from health service', async () => {
      const error = new Error('Health service unavailable');
      healthService.check.mockRejectedValue(error);

      await expect(healthController.check()).rejects.toThrow(
        'Health service unavailable',
      );
      expect(healthService.check).toHaveBeenCalledWith();
    });

    it('should call health service check method only once per request', async () => {
      healthService.check.mockResolvedValue(mockHealthCheckResult);

      await healthController.check();

      expect(healthService.check).toHaveBeenCalledTimes(1);
    });
  });
});
