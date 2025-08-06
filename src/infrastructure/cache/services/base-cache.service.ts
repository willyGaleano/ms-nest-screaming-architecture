import { Inject, Injectable } from '@nestjs/common';
import { RedisArgument, RedisClientType } from 'redis';
import { REDIS_CLIENT } from '@cache/constants';

@Injectable()
export class BaseCacheService {
  constructor(
    @Inject(REDIS_CLIENT)
    protected readonly cacheClient: RedisClientType,
  ) {}

  async delete(keys: RedisArgument | Array<RedisArgument>): Promise<number> {
    return this.cacheClient.del(keys);
  }

  async exists(keys: RedisArgument | Array<RedisArgument>): Promise<number> {
    return this.cacheClient.exists(keys);
  }
}
