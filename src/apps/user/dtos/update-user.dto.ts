import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserGender, UserStatus } from '@root/generated/prisma';
import { IsEntityId } from '@common/decorators';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserParams {
  @IsEntityId('user ID')
  userId: string;
}

export class UpdateUserRequest {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  @ApiPropertyOptional({
    description: 'User name',
    example: 'John',
    type: String,
    minLength: 2,
    maxLength: 100,
  })
  name?: string;

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
  @IsOptional()
  @ApiPropertyOptional({
    description: 'User gender',
    example: 'male',
    enum: UserGender,
  })
  gender?: UserGender;

  @IsEmail()
  @IsOptional()
  @MaxLength(100)
  @ApiPropertyOptional({
    description: 'User email',
    example: 'john.doe@example.com',
    type: String,
    maxLength: 100,
  })
  email?: string;
}

export class UpdateUserResponse {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'cl9ebqhxs00003b68wpfli1y',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The status of the user',
    example: 'active',
    enum: UserStatus,
  })
  status: UserStatus;
}
