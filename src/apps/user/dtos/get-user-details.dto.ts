import { IsEntityId } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDetailsParams {
  @IsEntityId('user ID')
  userId: string;
}

export class GetUserDetailsResponse {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'cl9ebqhxs00003b68wpfli1y',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
    type: String,
  })
  email: string;
}
