import { InternalServerErrorException } from '@nestjs/common';
import z from 'zod/v4';
import { EnvironmentVariables } from '@config/types';
import { ENVIRONMENT_VARIABLES } from '@config/constants';

export class EnvVarsService {
  static getEnvironmentVariables(
    config: Record<string, unknown>,
  ): EnvironmentVariables {
    try {
      return ENVIRONMENT_VARIABLES.parse(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`,
        );
        throw new InternalServerErrorException({
          msg: 'Error validating environment variables',
          errors: formattedErrors,
        });
      }

      throw new InternalServerErrorException({
        msg: 'Unexpected error during environment variable validation',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
