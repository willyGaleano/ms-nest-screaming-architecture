import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { KafkaConfigService } from '@broker/kafka/services';
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

    app.connectMicroservice<MicroserviceOptions>(
      KafkaConfigService.getOptions(configService),
    );
    await app.startAllMicroservices();

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
