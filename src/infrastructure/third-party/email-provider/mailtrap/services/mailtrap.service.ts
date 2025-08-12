import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/types';
import { HttpClientService } from '@http-client/services';
import {
  MailtrapConfig,
  MailtrapResponse,
} from '@third-party/email-provider/mailtrap/types';
import { HttpClientHeaders } from '@http-client/types';
import { EmailNotificationPayload } from '@notification/dtos';

@Injectable()
export class MailtrapService {
  private readonly mailtrapConfig: MailtrapConfig;

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    this.mailtrapConfig = {
      apiUrl: this.configService.getOrThrow<string>('MAILTRAP_API_URL'),
      inboxId: this.configService.getOrThrow<string>('MAILTRAP_INBOX_ID'),
      apiToken: this.configService.getOrThrow<string>('MAILTRAP_API_TOKEN'),
      fromEmail: this.configService.getOrThrow<string>('MAILTRAP_FROM_EMAIL'),
      fromName: this.configService.getOrThrow<string>('MAILTRAP_FROM_NAME'),
    };
  }

  async send(payload: EmailNotificationPayload): Promise<MailtrapResponse> {
    const { apiUrl, inboxId } = this.mailtrapConfig;

    const url = `${apiUrl}/${inboxId}`;

    return this.httpClientService.post<
      MailtrapResponse,
      EmailNotificationPayload
    >(url, this.buildBodyRequest(payload), { headers: this.buildHeaders() });
  }

  private buildBodyRequest(
    payload: EmailNotificationPayload,
  ): EmailNotificationPayload {
    return {
      ...payload,
      from: {
        email: payload?.from?.email || this.mailtrapConfig.fromEmail,
        name: payload?.from?.name || this.mailtrapConfig.fromName,
      },
    };
  }

  private buildHeaders(): HttpClientHeaders {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.mailtrapConfig.apiToken}`,
    };
  }
}
