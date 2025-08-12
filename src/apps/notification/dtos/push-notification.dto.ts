import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class PushNotificationPayload {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(65)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(240)
  body: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  icon?: string;
}
