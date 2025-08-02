import { Module } from '@nestjs/common';
import { ConfigAppModule } from '@config/config.module';
import { ContextStoreModule } from '@context-store/context-store.module';
import { LoggerAppModule } from '@logger/logger.module';

@Module({
  imports: [ConfigAppModule, ContextStoreModule, LoggerAppModule],
})
export class AppModule {}
