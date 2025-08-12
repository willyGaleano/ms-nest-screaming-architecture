import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserGender, UserStatus } from '@root/generated/prisma';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserRequest {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({
    description: 'User name',
    example: 'John',
    type: String,
    minLength: 2,
    maxLength: 100,
  })
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(150)
  @ApiPropertyOptional({
    description: 'User last name',
    example: 'Doe',
    type: String,
    minLength: 2,
    maxLength: 150,
  })
  lastName?: string;

  @IsEnum(UserGender)
  @ApiProperty({
    description: 'User gender',
    example: UserGender.MALE,
    enum: UserGender,
  })
  gender: UserGender;

  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
    type: String,
    maxLength: 100,
  })
  email: string;
}

export class CreateUserResponse {
  @ApiProperty({
    description: 'The unique identifier of the created user',
    example: 'cl9ebqhxs00003b68wpfli1y',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The status of the created user',
    example: UserStatus.ACTIVE,
    enum: UserStatus,
  })
  status: UserStatus;
}
