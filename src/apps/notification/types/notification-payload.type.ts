import {
  EmailNotificationPayload,
  PushNotificationPayload,
  SmsNotificationPayload,
} from '@notification/dtos';

export type NotificationPayload =
  | EmailNotificationPayload
  | SmsNotificationPayload
  | PushNotificationPayload;
