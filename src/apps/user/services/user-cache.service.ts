import { Injectable } from '@nestjs/common';
import { User } from '@root/generated/prisma';
import { UserQueryRepository } from '@user/repositories';
import { StringCacheable } from '@cache/decorators';
import {
  USER_DETAILS_CACHE_KEY_PREFIX,
  USER_DETAILS_CACHE_TTL_SECONDS,
} from '@user/constants';

@Injectable()
export class UserCacheService {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  @StringCacheable({
    keyPrefix: USER_DETAILS_CACHE_KEY_PREFIX,
    ttl: USER_DETAILS_CACHE_TTL_SECONDS,
  })
  async getUserById(userId: string): Promise<User | null> {
    return this.userQueryRepository.findUnique<User>({
      where: { id: userId },
    });
  }
}
