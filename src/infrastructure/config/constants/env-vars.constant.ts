import { z } from 'zod/v4';
import { environmentValues, nodeEnvValues } from '@config/constants';

export const CONFIG_BASE_ENV_VARS = z
  .object({
    APP_NAME: z.string(),
    HTTP_PORT: z.coerce.number(),
    NODE_ENV: z.enum(nodeEnvValues),
    ENVIRONMENT: z.enum(environmentValues),
  })
  .describe('Configuration Base Environment Variables');

export const ENVIRONMENT_VARIABLES = z
  .object({
    ...CONFIG_BASE_ENV_VARS.shape,
  })
  .describe('Environment Variables');
