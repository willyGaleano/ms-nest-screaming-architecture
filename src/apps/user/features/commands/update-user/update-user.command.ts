import { UserGender } from '@root/generated/prisma';
import { UpdateUserRequest } from '@user/dtos';

export class UpdateUserCommand {
  constructor(
    public readonly userId: string,
    public readonly updateUserRequest: UpdateUserRequest,
  ) {
    this.name = updateUserRequest.name;
    this.lastName = updateUserRequest.lastName;
    this.gender = updateUserRequest.gender;
    this.email = updateUserRequest.email;
  }

  name?: string;
  lastName?: string;
  gender?: UserGender;
  email?: string;
}
