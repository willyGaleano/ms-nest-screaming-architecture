import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from '@notification/interfaces';
import { MailtrapService } from '@third-party/email-provider/mailtrap/services';
import { EmailNotificationPayload } from '@notification/dtos';

@Injectable()
export class EmailNotificationStrategy implements NotificationStrategy {
  constructor(private readonly mailtrapService: MailtrapService) {}

  async send(payload: EmailNotificationPayload): Promise<boolean> {
    const response = await this.mailtrapService.send(payload);

    return response.success;
  }
}
