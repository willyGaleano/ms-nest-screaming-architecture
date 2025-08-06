import { AxiosRequestConfig } from 'axios';

export type HttpClientRequestConfig<D = any> = AxiosRequestConfig<D>;
export type HttpClientHeaders = HttpClientRequestConfig<any>['headers'];
