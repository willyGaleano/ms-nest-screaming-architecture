import { z } from 'zod/v4';
import {
  LOGGER_ERROR_KEY_DEFAULT,
  LOGGER_MESSAGE_KEY_DEFAULT,
  LOGGER_TARGET_DEFAULT,
  logLevelValues,
} from '@logger/constants';

export const LOGGER_ENV_VARS = z
  .object({
    LOG_LEVEL: z.enum(logLevelValues),
    LOGGER_MESSAGE_KEY: z.string().default(LOGGER_MESSAGE_KEY_DEFAULT),
    LOGGER_TARGET: z.string().default(LOGGER_TARGET_DEFAULT),
    LOGGER_ERROR_KEY: z.string().default(LOGGER_ERROR_KEY_DEFAULT),
  })
  .describe('Logger Environment Variables');
