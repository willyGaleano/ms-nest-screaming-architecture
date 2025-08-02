import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
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
}
