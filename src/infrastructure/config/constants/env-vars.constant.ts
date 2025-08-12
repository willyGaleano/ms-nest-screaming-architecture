import { z } from 'zod/v4';
import { environmentValues, nodeEnvValues } from '@config/constants';
import { LOGGER_ENV_VARS } from '@logger/constants';
import { SECURITY_ENV_VARS } from '@security/constants';
import { CACHE_ENV_VARS } from '@cache/constants';
import { DATA_BASE_ENV_VARS } from '@db/constants';
import { HTTP_CLIENT_ENV_VARS } from '@http-client/constants';
import { KAFKA_ENV_VARS } from '@broker/kafka/constants';
import { EMAIL_PROVIDER_ENV_VARS } from '@third-party/email-provider/constants';
import { HEALTH_ENV_VARS } from '@health/constants';

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
    ...LOGGER_ENV_VARS.shape,
    ...SECURITY_ENV_VARS.shape,
    ...CACHE_ENV_VARS.shape,
    ...DATA_BASE_ENV_VARS.shape,
    ...HTTP_CLIENT_ENV_VARS.shape,
    ...KAFKA_ENV_VARS.shape,
    ...EMAIL_PROVIDER_ENV_VARS.shape,
    ...HEALTH_ENV_VARS.shape,
  })
  .describe('Environment Variables');
