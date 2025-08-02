import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvVarsService } from '@config/services';
import { EnvironmentVariables } from '@config/types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>): EnvironmentVariables => {
        return EnvVarsService.getEnvironmentVariables(config);
      },
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigAppModule {}
