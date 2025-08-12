import { applyDecorators } from '@nestjs/common';
import { IsString, Matches } from 'class-validator';

/**
 * Custom decorator to validate entity IDs (CUID format)
 * Can be applied to any entity ID parameter in the project
 *
 * @param fieldName - Optional custom field name for error messages (default: 'ID')
 * @returns Combined decorators for CUID validation
 */
export function IsEntityId(fieldName = 'ID') {
  return applyDecorators(
    IsString(),
    Matches(/^c[0-9a-z]{24}$/, {
      message: `Invalid ${fieldName} format`,
    }),
  );
}
