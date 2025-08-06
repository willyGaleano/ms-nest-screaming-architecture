import { z } from 'zod/v4';
import { THROTTLER_ENV_VARS } from '@security/throttler/constants';
import { CORS_ENV_VARS } from '@security/cors/constants';

export const SECURITY_ENV_VARS = z
  .object({
    ...THROTTLER_ENV_VARS.shape,
    ...CORS_ENV_VARS.shape,
  })
  .describe('Security Environment Variables');
