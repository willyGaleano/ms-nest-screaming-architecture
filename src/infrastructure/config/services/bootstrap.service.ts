import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentVariables } from '@config/types';

export class BootstrapService {
  static async startServer(
    app: NestFastifyApplication,
    logger: Logger,
    configService: ConfigService<EnvironmentVariables>,
  ): Promise<void> {
    const appName = configService.get<string>('APP_NAME');
    const port = configService.getOrThrow<number>('HTTP_PORT');
    const address = '0.0.0.0';

    await app.listen(port, address);
    const url = await app.getUrl();

    logger.log(`Server ${appName} is running on: ${url}`);
  }

  static setupSwagger(app: NestFastifyApplication): void {
    const options = new DocumentBuilder()
      .setTitle('NestJS Screaming Architecture')
      .setDescription('API documentation for the NestJS Screaming Architecture')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('swagger', app, document);
  }
}
