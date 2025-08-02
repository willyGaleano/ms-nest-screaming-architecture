import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
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

  await BootstrapService.startServer(app, configService);
}

void bootstrap();
