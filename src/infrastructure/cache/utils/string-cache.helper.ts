import { BadRequestException } from '@nestjs/common';
import { StringCacheableOptions } from '@cache/types';

export function validateStringCacheableOptions(
  options: StringCacheableOptions,
  args: unknown[],
): void {
  if (!options.key && !options.keyPrefix)
    throw new BadRequestException(
      'Either key or keyPrefix must be specified in @StringCacheable options',
    );

  if (options.key) return;

  if (options.keyPrefix && args.length === 0)
    throw new BadRequestException(
      'Method decorated with @StringCacheable using keyPrefix must have at least one parameter',
    );

  const keyParamIndex = options.keyParamIndex ?? 0;

  if (keyParamIndex < 0)
    throw new BadRequestException(
      `KeyParamIndex cannot be negative. Got: ${keyParamIndex}`,
    );

  if (keyParamIndex >= args.length)
    throw new BadRequestException(
      `KeyParamIndex ${keyParamIndex} exceeds available parameters. Method has ${args.length} parameter(s)`,
    );

  const keyValue = args[keyParamIndex];
  if (!keyValue)
    throw new BadRequestException(
      `Key parameter at index ${keyParamIndex} is null or undefined`,
    );

  if (typeof keyValue !== 'string' && typeof keyValue !== 'number')
    throw new BadRequestException(
      `Key parameter at index ${keyParamIndex} must be a string or number`,
    );
}

export function buildStringCacheableKey(
  options: StringCacheableOptions,
  args: unknown[],
): string {
  if (options.key) return options.key;

  const keyParamIndex = options.keyParamIndex ?? 0;
  const keyValue = args[keyParamIndex];

  return `${options.keyPrefix}:${String(keyValue)}`;
}

export function isValueCacheable(value: unknown): boolean {
  if (!value) return false;

  if (typeof value === 'string' && value.trim() === '') return false;

  if (Array.isArray(value) && value.length === 0) return false;

  if (typeof value === 'object' && Object.keys(value).length === 0)
    return false;

  return true;
}

export function serializeForStringCache(value: unknown): string | number {
  if (typeof value === 'object') return JSON.stringify(value);

  if (typeof value === 'string' || typeof value === 'number') return value;
  if (typeof value === 'boolean') return String(value);

  throw new BadRequestException(
    `Unsupported value type for string caching: ${typeof value}`,
  );
}

export function deserializeFromStringCache(cachedValue: string): any {
  try {
    return JSON.parse(cachedValue);
  } catch (_error) {
    return cachedValue;
  }
}
