export type MailtrapConfig = {
  apiUrl: string;
  inboxId: string;
  apiToken: string;
  fromEmail: string;
  fromName: string;
};

export type MailtrapResponse = {
  success: boolean;
  message_ids: string[];
};
