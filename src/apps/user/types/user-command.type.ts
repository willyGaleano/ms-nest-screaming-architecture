import { UserStatus } from '@root/generated/prisma';

export type CreateUserSelect = {
  id: string;
  status: UserStatus;
};

export type UpdateUserSelect = CreateUserSelect;
