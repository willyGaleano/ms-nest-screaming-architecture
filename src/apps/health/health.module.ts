import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '@health/controllers';
import { HealthService } from '@health/services';

@Module({
  imports: [TerminusModule],
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
