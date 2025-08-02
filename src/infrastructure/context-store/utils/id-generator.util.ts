import { TrackingHeader } from '@common/enums';
import { BadRequestException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

export function getOrGenerateTrackingId(
  req?: FastifyRequest,
  trackingHeader?: TrackingHeader,
): string {
  if (!req || !trackingHeader) return uuidv4();

  const headers = req?.headers;
  const trackingId = headers[trackingHeader];

  if (!trackingId) return uuidv4();

  if (Array.isArray(trackingId))
    throw new BadRequestException(
      `Invalid header format for ${trackingHeader}. Expected a single value, but received an array.`,
    );

  return trackingId;
}
