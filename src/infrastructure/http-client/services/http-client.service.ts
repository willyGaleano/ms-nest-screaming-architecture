import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { TrackingHeader } from '@common/enums';
import { ContextStoreService } from '@context-store/services';
import { HttpClientHeaders, HttpClientRequestConfig } from '@http-client/types';

@Injectable()
export class HttpClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly contextStoreService: ContextStoreService,
  ) {}

  async get<T>(url: string, config: HttpClientRequestConfig): Promise<T> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<T>(url, {
          ...config,
          headers: this.buildHeaders(config.headers),
        })
        .pipe(catchError((error: AxiosError) => throwError(() => error))),
    );

    return data;
  }

  async post<T, D>(
    url: string,
    data: D,
    config: HttpClientRequestConfig,
  ): Promise<T> {
    const { data: responseData } = await firstValueFrom(
      this.httpService
        .post<T>(url, data, {
          ...config,
          headers: this.buildHeaders(config.headers),
        })
        .pipe(catchError((error: AxiosError) => throwError(() => error))),
    );

    return responseData;
  }

  private buildHeaders(headers: HttpClientHeaders): HttpClientHeaders {
    return {
      ...headers,
      [TrackingHeader.X_REQUEST_ID]: this.contextStoreService.getRequestId(),
      [TrackingHeader.X_CORRELATION_ID]:
        this.contextStoreService.getCorrelationId(),
    };
  }
}
