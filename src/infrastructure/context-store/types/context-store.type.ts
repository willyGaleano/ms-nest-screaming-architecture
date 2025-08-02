import { ClsStore } from 'nestjs-cls';
import { IContextStore } from '@context-store/interfaces';

export type ContextStoreKeys = keyof Omit<IContextStore, keyof ClsStore>;
