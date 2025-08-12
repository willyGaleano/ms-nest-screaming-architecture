import { z } from 'zod/v4';

export const USER_ENV_VARS = z
  .object({
    USER_DETAILS_CACHE_TTL_SECONDS: z.coerce.number().positive(),
  })
  .describe('User Environment Variables');
