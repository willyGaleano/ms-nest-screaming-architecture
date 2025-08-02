import { ClsStore } from 'nestjs-cls';

export interface IContextStore extends ClsStore {
  requestId: string;
  correlationId: string;
}
