import { HealthCheckResult, HealthIndicatorResult } from '@nestjs/terminus';

export const mockHealthCheckResult: HealthCheckResult = {
  status: 'ok',
  info: {
    memory_heap: {
      status: 'up',
    },
  },
  error: {},
  details: {
    memory_heap: {
      status: 'up',
    },
  },
};

export const mockFailedHealthCheckResult: HealthCheckResult = {
  status: 'error',
  info: {},
  error: {
    memory_heap: {
      status: 'down',
      message: 'Memory usage exceeded limit',
    },
  },
  details: {
    memory_heap: {
      status: 'down',
      message: 'Memory usage exceeded limit',
    },
  },
};

export const mockMemoryHealthIndicatorResult: HealthIndicatorResult = {
  memory_heap: {
    status: 'up',
  },
};
