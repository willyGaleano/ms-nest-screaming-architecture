import { z } from 'zod/v4';
import { booleanFromString } from '@common/schemas';

export const CACHE_ENV_VARS = z
  .object({
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),
    REDIS_PASSWORD: z.string().optional(),
    REDIS_USE_TLS: booleanFromString('false'),
  })
  .describe('Cache Environment Variables');
