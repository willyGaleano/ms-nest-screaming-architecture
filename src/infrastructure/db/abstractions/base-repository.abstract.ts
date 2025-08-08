import { Prisma } from '@root/generated/prisma';
import { ContextDbService } from '@db/services';

export abstract class BaseRepository {
  constructor(protected readonly contextDb: ContextDbService) {}

  async executeTransaction<T>(
    callback: (trx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this.contextDb.prisma.$transaction(callback);
  }

  async executeQueryRaw<T>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: unknown[]
  ): Promise<T> {
    return this.contextDb.prisma.$queryRaw<T>(query, ...values);
  }
}
