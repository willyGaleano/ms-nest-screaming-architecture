import { z } from 'zod/v4';

export const EMAIL_PROVIDER_ENV_VARS = z
  .object({
    MAILTRAP_API_URL: z.string(),
    MAILTRAP_INBOX_ID: z.string(),
    MAILTRAP_API_TOKEN: z.string(),
    MAILTRAP_FROM_EMAIL: z.email(),
    MAILTRAP_FROM_NAME: z.string(),
  })
  .describe('Email Provider Environment Variables');
