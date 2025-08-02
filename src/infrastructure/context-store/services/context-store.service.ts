import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { IContextStore } from '@context-store/interfaces';
import { CORRELATION_ID_KEY, REQUEST_ID_KEY } from '@context-store/constants';

@Injectable()
export class ContextStoreService {
  constructor(private readonly clsService: ClsService<IContextStore>) {}

  getRequestId(): string {
    return this.clsService.get(REQUEST_ID_KEY);
  }

  getCorrelationId(): string {
    return this.clsService.get(CORRELATION_ID_KEY);
  }
}
