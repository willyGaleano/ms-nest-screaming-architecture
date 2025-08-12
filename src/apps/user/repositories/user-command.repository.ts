import { Injectable } from '@nestjs/common';
import { Prisma } from '@root/generated/prisma';
import { BaseRepository } from '@db/abstractions';
import { ContextDbService } from '@db/services';

@Injectable()
export class UserCommandRepository extends BaseRepository {
  constructor(readonly contextDb: ContextDbService) {
    super(contextDb);
  }

  async create<T = Prisma.UserGetPayload<object>>(
    args: Prisma.UserCreateArgs,
  ): Promise<T> {
    return (await this.contextDb.user.create(args)) as T;
  }

  async update<T = Prisma.UserGetPayload<object>>(
    args: Prisma.UserUpdateArgs,
  ): Promise<T> {
    return (await this.contextDb.user.update(args)) as T;
  }

  async delete<T = Prisma.UserGetPayload<object>>(
    args: Prisma.UserDeleteArgs,
  ): Promise<T> {
    return (await this.contextDb.user.delete(args)) as T;
  }
}
