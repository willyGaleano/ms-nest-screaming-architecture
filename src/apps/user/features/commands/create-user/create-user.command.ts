import { UserGender } from '@root/generated/prisma';
import { CreateUserRequest } from '@user/dtos';

export class CreateUserCommand {
  constructor(public readonly createUserRequest: CreateUserRequest) {
    this.name = createUserRequest.name;
    this.lastName = createUserRequest.lastName;
    this.gender = createUserRequest.gender;
    this.email = createUserRequest.email;
  }

  name: string;
  lastName?: string;
  gender: UserGender;
  email: string;
}
