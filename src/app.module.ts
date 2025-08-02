import { Module } from '@nestjs/common';
import { ConfigAppModule } from '@config/config.module';
import { LoggerAppModule } from '@logger/logger.module';

@Module({
  imports: [ConfigAppModule, LoggerAppModule],
})
export class AppModule {}
