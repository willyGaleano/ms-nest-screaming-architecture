import { z } from 'zod/v4';

export const HTTP_CLIENT_ENV_VARS = z
  .object({
    HTTP_CLIENT_TIMEOUT: z.coerce.number(),
    HTTP_CLIENT_MAX_RATE: z.coerce.number(),
    HTTP_CLIENT_MAX_REDIRECTS: z.coerce.number(),
    HTTP_CLIENT_MAX_RETRIES: z.coerce.number(),
  })
  .describe('HTTP Client Environment Variables');
