import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { BootstrapService } from '@config/services';
import { EnvironmentVariables } from '@config/types';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  app.enableVersioning({ type: VersioningType.URI });
  app.enableShutdownHooks();

  const logger = app.get(Logger);
  app.useLogger(logger);

  await BootstrapService.startServer(app, logger, configService);
}

void bootstrap();
