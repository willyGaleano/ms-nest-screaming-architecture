import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { LoggerService } from '@logger/services';
import { EnvironmentVariables } from '@config/types';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        return LoggerService.getConfigParams(configService);
      },
      inject: [ConfigService],
    }),
  ],
})
export class LoggerAppModule {}
