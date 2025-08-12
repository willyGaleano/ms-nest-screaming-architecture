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
import { ApiProperty } from '@nestjs/swagger';

export class EmailNoficationAdress {
  @IsEmail()
  @MaxLength(150)
  @ApiProperty({
    description: 'The email address of the notification recipient',
    example: 'recipient@example.com',
  })
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'The name of the notification recipient',
    example: 'Recipient Name',
    maxLength: 100,
  })
  name?: string;
}

export class EmailNotificationPayload {
  @ValidateNested()
  @Type(() => EmailNoficationAdress)
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The sender of the email notification',
    example: {
      email: 'sender@example.com',
      name: 'Sender Name',
    },
  })
  from?: EmailNoficationAdress;

  @ValidateNested({ each: true })
  @Type(() => EmailNoficationAdress)
  @ArrayMaxSize(1000)
  @ApiProperty({
    description: 'The recipients of the email notification',
    example: [
      {
        email: 'recipient1@example.com',
        name: 'Recipient One',
      },
      {
        email: 'recipient2@example.com',
        name: 'Recipient Two',
      },
    ],
  })
  to: EmailNoficationAdress[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The subject of the email notification',
    example: 'Welcome to our service!',
  })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The plain text content of the email notification',
    example: 'Thank you for joining our service.',
  })
  text: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The HTML content of the email notification',
    example: '<p>Thank you for joining our service.</p>',
  })
  html?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    description: 'The category of the email notification',
    example: 'welcome',
    maxLength: 255,
  })
  category?: string;
}
