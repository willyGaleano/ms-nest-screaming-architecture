import { Global, Module } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ClsModule, ClsService } from 'nestjs-cls';
import { ContextStoreService } from '@context-store/services';
import { getOrGenerateTrackingId } from '@context-store/utils';
import { TrackingHeader } from '@common/enums';
import { CORRELATION_ID_KEY, REQUEST_ID_KEY } from '@context-store/constants';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls: ClsService, req: FastifyRequest): void => {
          cls.set(REQUEST_ID_KEY, getOrGenerateTrackingId());
          cls.set(
            CORRELATION_ID_KEY,
            getOrGenerateTrackingId(req, TrackingHeader.X_CORRELATION_ID),
          );
        },
      },
    }),
  ],
  providers: [ContextStoreService],
  exports: [ContextStoreService],
})
export class ContextStoreModule {}
