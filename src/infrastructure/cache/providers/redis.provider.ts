import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientOptions } from 'redis';
import { Logger } from 'nestjs-pino';
import { REDIS_CLIENT } from '@cache/constants';
import { EnvironmentVariables } from '@config/types';

export class RedisProvider {
  static create(): Provider {
    return {
      provide: REDIS_CLIENT,
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
        logger: Logger,
      ) => {
        const configuration = RedisProvider.buildOptions(configService);
        const redisClient = createClient(configuration);

        redisClient.on('connect', () => {
          logger.log({
            msg: 'Redis connected',
          });
        });

        redisClient.on('error', (err: Error) => {
          logger.error({
            msg: 'Redis error',
            error: err.message,
          });
        });

        redisClient.on('reconnecting', () => {
          logger.warn({
            msg: 'Redis reconnecting',
          });
        });

        await redisClient.connect();

        return redisClient;
      },
      inject: [ConfigService, Logger],
    };
  }

  static buildOptions(
    configService: ConfigService<EnvironmentVariables>,
  ): RedisClientOptions {
    const useTLS = configService.getOrThrow<boolean>('REDIS_USE_TLS');
    const redisHost = configService.getOrThrow<string>('REDIS_HOST');
    const port = configService.getOrThrow<number>('REDIS_PORT');

    const options: RedisClientOptions = {};

    options.socket = {
      host: redisHost,
      port,
      tls: useTLS || undefined,
    };

    const password = configService.get<string>('REDIS_PASSWORD');
    if (password) options.password = password;

    return options;
  }
}
