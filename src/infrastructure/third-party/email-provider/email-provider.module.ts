import { Module } from '@nestjs/common';
import { HttpClientModule } from '@http-client/http-client.module';
import { MailtrapService } from '@third-party/email-provider/mailtrap/services';

@Module({
  imports: [HttpClientModule],
  providers: [MailtrapService],
  exports: [MailtrapService],
})
export class EmailProviderModule {}
