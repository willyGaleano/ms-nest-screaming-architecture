import { Injectable } from '@nestjs/common';
import { Prisma } from '@root/generated/prisma';
import { BaseRepository } from '@db/abstractions';
import { ContextDbService } from '@db/services';

@Injectable()
export class UserQueryRepository extends BaseRepository {
  constructor(readonly contextDb: ContextDbService) {
    super(contextDb);
  }

  async findUnique<T = Prisma.UserGetPayload<object>>(
    args: Prisma.UserFindUniqueArgs,
  ): Promise<T | null> {
    return (await this.contextDb.user.findUnique(args)) as T | null;
  }

  async findFirst<T = Prisma.UserGetPayload<object>>(
    args: Prisma.UserFindFirstArgs,
  ): Promise<T | null> {
    return (await this.contextDb.user.findFirst(args)) as T | null;
  }

  async findMany<T = Prisma.UserGetPayload<object>>(
    args: Prisma.UserFindManyArgs,
  ): Promise<T[]> {
    return (await this.contextDb.user.findMany(args)) as T[];
  }

  async count(args: Prisma.UserCountArgs): Promise<number> {
    return this.contextDb.user.count(args);
  }
}
