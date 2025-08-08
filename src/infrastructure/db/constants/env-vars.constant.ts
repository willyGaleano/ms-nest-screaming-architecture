import z from 'zod/v4';

export const DATA_BASE_ENV_VARS = z
  .object({
    DATABASE_URL: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
    POSTGRES_PORT: z.coerce.number(),
  })
  .describe('Data Base Environment Variables');
