import { z } from 'zod/v4';
import { CorsOrigin } from '@security/cors/types';
import {
  CORS_DEFAULT_HEADERS,
  CORS_HTTP_METHODS,
} from '@security/cors/constants';

const corsOriginSchema = z
  .string()
  .refine(
    (value: string) => {
      if (value === 'true' || value === 'false' || value === '*') return true;

      const origins = value.split(',').map((origin) => origin.trim());
      return origins.every((origin) => {
        try {
          if (origin.includes('localhost') || origin.includes('127.0.0.1'))
            return true;

          new URL(origin);
          return true;
        } catch {
          return false;
        }
      });
    },
    {
      message:
        'CORS_ORIGIN must be "true", "false", "*" or valid URLs separated by commas',
    },
  )
  .transform((value: string): CorsOrigin => {
    const trimmed = value.trim();

    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    if (trimmed === '*') return '*';

    return trimmed.split(',').map((origin) => origin.trim());
  });

const corsMethodsSchema = z
  .string()
  .optional()
  .refine(
    (value: string | undefined) => {
      if (!value) return true;

      const methods = value.split(',').map((m) => m.trim().toUpperCase());
      return methods.every((method) => CORS_HTTP_METHODS.includes(method));
    },
    {
      message: `CORS_METHODS must be a comma-separated list of valid HTTP methods: ${CORS_HTTP_METHODS.join(', ')}`,
    },
  )
  .transform((value): string[] => {
    if (!value) return CORS_HTTP_METHODS;

    return value.split(',').map((method) => method.trim().toUpperCase());
  });

const corsHeadersSchema = z
  .string()
  .optional()
  .refine(
    (value: string | undefined) => {
      if (!value) return true;

      const headers = value.split(',').map((header) => header.trim());
      return headers.every(
        (header) =>
          header.length > 0 &&
          /^[a-zA-Z0-9\-_]+$/.test(header.replace(/\s/g, '')),
      );
    },
    {
      message:
        'CORS_ALLOWED_HEADERS must be a comma-separated list of valid header names',
    },
  )
  .transform((value: string | undefined): string[] => {
    if (!value) return CORS_DEFAULT_HEADERS;

    return value.split(',').map((header) => header.trim());
  });

const corsCredentialsSchema = z
  .enum(['true', 'false'])
  .optional()
  .transform((value): boolean => {
    if (!value) return true;

    return value === 'true';
  });

export const CORS_ENV_VARS = z
  .object({
    CORS_ORIGIN: corsOriginSchema,
    CORS_CREDENTIALS: corsCredentialsSchema,
    CORS_METHODS: corsMethodsSchema,
    CORS_ALLOWED_HEADERS: corsHeadersSchema,
  })
  .describe('CORS Environment Variables');
