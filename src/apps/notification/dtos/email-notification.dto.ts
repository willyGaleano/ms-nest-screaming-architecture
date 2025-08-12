import {
  IsString,
  IsOptional,
  IsEmail,
  ValidateNested,
  MaxLength,
  ArrayMaxSize,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EmailNoficationAdress {
  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}

export class EmailNotificationPayload {
  @ValidateNested()
  @Type(() => EmailNoficationAdress)
  @IsOptional()
  @IsNotEmpty()
  from?: EmailNoficationAdress;

  @ValidateNested({ each: true })
  @Type(() => EmailNoficationAdress)
  @ArrayMaxSize(1000)
  to: EmailNoficationAdress[];

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  html?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  category?: string;
}
