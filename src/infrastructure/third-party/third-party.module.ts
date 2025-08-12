import { Module } from '@nestjs/common';
import { EmailProviderModule } from '@third-party/email-provider/email-provider.module';

@Module({
  imports: [EmailProviderModule],
  exports: [EmailProviderModule],
})
export class ThirdPartyModule {}
