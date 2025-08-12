import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { AppModule } from '@root/src/app.module';
import { CorsService } from '@security/cors/services';
import { BootstrapService } from '@config/services';
import { EnvironmentVariables } from '@config/types';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const logger = app.get(Logger);

  await CorsService.registerFastifyCors(app, configService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableVersioning({ type: VersioningType.URI });
  app.enableShutdownHooks();
  app.useLogger(logger);

  BootstrapService.setupSwagger(app);
  await BootstrapService.startServer(app, logger, configService);
}

void bootstrap();
