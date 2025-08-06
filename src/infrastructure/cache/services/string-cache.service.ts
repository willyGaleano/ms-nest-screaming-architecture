import { Inject, Injectable } from '@nestjs/common';
import { RedisArgument, RedisClientType, SetOptions } from 'redis';
import { BaseCacheService } from '@cache/services';
import { REDIS_CLIENT } from '@cache/constants';

@Injectable()
export class StringCacheService extends BaseCacheService {
  constructor(
    @Inject(REDIS_CLIENT)
    readonly cacheClient: RedisClientType,
  ) {
    super(cacheClient);
  }

  async set(
    key: string,
    value: number | RedisArgument,
    options?: SetOptions,
  ): Promise<string | null> {
    return this.cacheClient.set(key, value, options);
  }

  async get(key: RedisArgument): Promise<string | null> {
    return this.cacheClient.get(key);
  }

  async increment(key: RedisArgument): Promise<number> {
    return this.cacheClient.incr(key);
  }

  async incrementBy(key: RedisArgument, increment: number): Promise<number> {
    return this.cacheClient.incrBy(key, increment);
  }

  async decrement(key: RedisArgument): Promise<number> {
    return this.cacheClient.decr(key);
  }

  async decrementBy(key: RedisArgument, decrement: number): Promise<number> {
    return this.cacheClient.decrBy(key, decrement);
  }
}
