import { Module } from '@nestjs/common';
import { RedisProvider } from '@cache/providers';
import { BaseCacheService, StringCacheService } from '@cache/services';

@Module({
  providers: [RedisProvider.create(), BaseCacheService, StringCacheService],
  exports: [StringCacheService],
})
export class CacheModule {}
