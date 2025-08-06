import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from '@http-client/services';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/types';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        timeout: configService.get<number>('HTTP_CLIENT_TIMEOUT'),
        maxRate: configService.get<number>('HTTP_CLIENT_MAX_RATE'),
        maxRedirects: configService.get<number>('HTTP_CLIENT_MAX_REDIRECTS'),
        maxRetries: configService.get<number>('HTTP_CLIENT_MAX_RETRIES'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {}
