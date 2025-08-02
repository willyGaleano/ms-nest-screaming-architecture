import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/types';

export class BootstrapService {
  static async startServer(
    app: NestFastifyApplication,
    configService: ConfigService<EnvironmentVariables>,
  ): Promise<void> {
    const port = configService.getOrThrow<number>('HTTP_PORT');
    const address = '0.0.0.0';

    await app.listen(port, address);
  }
}
