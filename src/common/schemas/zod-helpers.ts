import { z } from 'zod/v4';

export const booleanFromString = (defaultValue: 'true' | 'false' = 'false') =>
  z
    .enum(['true', 'false'])
    .default(defaultValue)
    .transform((value) => value === 'true');
