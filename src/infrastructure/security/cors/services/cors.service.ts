import { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { FastifyCorsOptions } from '@fastify/cors';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/types';
import { CorsOrigin } from '@security/cors/types';

export class CorsService {
  static getOptions(
    configService: ConfigService<EnvironmentVariables>,
  ): FastifyCorsOptions {
    const corsOrigin = configService.get<CorsOrigin>('CORS_ORIGIN');
    const corsCredentials = configService.get<boolean>('CORS_CREDENTIALS');
    const corsMethods = configService.get<string[]>('CORS_METHODS');
    const corsAllowedHeaders = configService.get<string[]>(
      'CORS_ALLOWED_HEADERS',
    );

    return {
      origin: corsOrigin,
      methods: corsMethods,
      allowedHeaders: corsAllowedHeaders,
      credentials: corsCredentials,
    };
  }

  static async registerFastifyCors(
    app: NestFastifyApplication,
    configService: ConfigService<EnvironmentVariables>,
  ): Promise<void> {
    await app.register(
      import('@fastify/cors'),
      CorsService.getOptions(configService),
    );
  }
}
