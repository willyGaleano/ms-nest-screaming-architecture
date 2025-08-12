import { IsEntityId } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserParams {
  @IsEntityId('user ID')
  userId: string;
}

export class DeleteUserResponse {
  @ApiProperty({
    description: 'Indicates whether the user deletion was successful',
    example: true,
    type: Boolean,
  })
  success: boolean;
}
