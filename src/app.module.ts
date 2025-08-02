import { Module } from '@nestjs/common';
import { ConfigAppModule } from '@config/config.module';

@Module({
  imports: [ConfigAppModule],
})
export class AppModule {}
