import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerAsyncOptions, ThrottlerOptions } from '@nestjs/throttler';
import { EnvironmentVariables } from '@config/types';

@Injectable()
export class ThrottlerService {
  static getAsyncOptions(): ThrottlerAsyncOptions {
    return {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        config: ConfigService<EnvironmentVariables>,
      ): Array<ThrottlerOptions> => [
        {
          ttl: config.getOrThrow<number>('THROTTLE_TTL'),
          limit: config.getOrThrow<number>('THROTTLE_REQUESTS'),
          blockDuration: config.getOrThrow<number>('THROTTLE_BLOCK_DURATION'),
        },
      ],
    };
  }
}
