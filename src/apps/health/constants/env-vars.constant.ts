import { z } from 'zod/v4';
import { HEALTH_CHECK_MEMORY_HEAP_LIMIT_DEFAULT } from '@health/constants';

export const HEALTH_ENV_VARS = z
  .object({
    HEALTH_CHECK_MEMORY_HEAP_LIMIT: z.coerce
      .number()
      .default(HEALTH_CHECK_MEMORY_HEAP_LIMIT_DEFAULT),
  })
  .describe('Health Environment Variables');
