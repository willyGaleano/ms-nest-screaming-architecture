/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Inject } from '@nestjs/common';
import { StringCacheService } from '@cache/services';
import {
  isValueCacheable,
  serializeForStringCache,
  deserializeFromStringCache,
  validateStringCacheableOptions,
  buildStringCacheableKey,
} from '@cache/utils';
import { StringCacheableOptions } from '@cache/types';

const injectStringCacheService = Inject(StringCacheService);

export function StringCacheable(
  options: StringCacheableOptions,
): MethodDecorator {
  return function (
    target: any,
    __: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    injectStringCacheService(target, 'cacheService');

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<any> {
      const cacheService: StringCacheService = this.cacheService;
      if (!cacheService)
        throw new BadRequestException('StringCacheService not injected');

      validateStringCacheableOptions(options, args);

      const cacheKey = buildStringCacheableKey(options, args);
      const cachedValue = await cacheService.get(cacheKey);

      if (cachedValue) return deserializeFromStringCache(cachedValue);

      const result = await originalMethod.apply(this, args);

      if (!isValueCacheable(result)) return result;

      const serializedValue = serializeForStringCache(result);
      await cacheService.set(cacheKey, serializedValue, { EX: options.ttl });

      return result;
    };

    return descriptor;
  };
}
