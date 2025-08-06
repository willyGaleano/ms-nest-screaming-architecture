import { z } from 'zod/v4';

export const THROTTLER_ENV_VARS = z
  .object({
    THROTTLE_TTL: z.coerce.number(),
    THROTTLE_REQUESTS: z.coerce.number(),
    THROTTLE_BLOCK_DURATION: z.coerce.number(),
  })
  .describe('Throttler Environment Variables');
