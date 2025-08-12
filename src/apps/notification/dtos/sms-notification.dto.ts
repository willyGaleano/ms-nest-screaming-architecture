import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class SmsNotificationPayload {
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  phoneNumbers: string[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(1600)
  message: string;

  @IsOptional()
  @IsString()
  @MaxLength(11)
  senderId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  data?: Record<string, unknown>;
}
