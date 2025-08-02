import { z } from 'zod/v4';
import { ENVIRONMENT_VARIABLES } from '@config/constants';

export type EnvironmentVariables = z.infer<typeof ENVIRONMENT_VARIABLES>;
