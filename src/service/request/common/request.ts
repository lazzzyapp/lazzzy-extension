/* eslint-disable no-empty-function */
import { IPutRequestOptions } from '@/service/common/request/put';
import { IExtendRequestIHelperOptions, IHelperOptions } from '@/service/common/request';
import { TRequestOption } from '@/service/common/request/option';
import { RequestInterceptor } from '@/service/common/request/interceptor';
import { IPostRequestOptions } from '@/service/common/request/post';
import { IPostFormRequestOptions } from '@/service/common/request/post/form';
import { IGetFormRequestOptions } from '@/service/common/request/get/form';

export class RequestHelper implements IExtendRequestIHelperOptions {
  constructor(private options: IHelperOptions) {}

  post<T>(url: string, options: Omit<IPostRequestOptions, 'method' | 'requestType'>) {
    return this.request<T>(url, {
      ...options,
      method: 'post',
      requestType: 'json',
    });
  }

  postForm<T>(url: string, options: Omit<IPostFormRequestOptions, 'method' | 'requestType'>) {
    return this.request<T>(url, {
      ...options,
      method: 'post',
      requestType: 'form',
    });
  }

  put<T>(url: string, options: Omit<IPutRequestOptions, 'method'>) {
    return this.request<T>(url, {
      ...options,
      method: 'put',
    });
  }

  get<T>(url: string, options?: Omit<IGetFormRequestOptions, 'method'>) {
    return this.request<T>(url, {
      ...options,
      method: 'get',
    });
  }

  private async request<T>(url: string, options: TRequestOption) {
    let requestUrl = url;
    let requestOptions = options;
    let requestInterceptors: RequestInterceptor[] | RequestInterceptor =
      this.options.interceptors?.request ?? [];

    if (requestInterceptors && !Array.isArray(requestInterceptors)) {
      requestInterceptors = [requestInterceptors] as RequestInterceptor[];
    }
    requestInterceptors = [this.basicRequestInterceptors.bind(this)].concat(requestInterceptors);
    for (const interceptor of requestInterceptors) {
      const res = interceptor(requestUrl, requestOptions);
      requestUrl = res.url ?? requestUrl;
      requestOptions = res.options ?? requestOptions;
    }
    return this.options.request.request<T>(requestUrl, requestOptions);
  }

  private basicRequestInterceptors(
    url: string,
    options: TRequestOption
  ): ReturnType<RequestInterceptor> {
    let requestUrl = url;
    if (!this.options.baseURL || url.match(/^https?:\/\//)) {
      requestUrl = url;
    } else {
      requestUrl = `${this.options.baseURL}${url}`;
    }
    const parsedUrl = new URL(requestUrl);
    if (this.options.params) {
      const keys = Object.keys(this.options.params);
      for (const key of keys) {
        if (!parsedUrl.searchParams.has(key)) {
          parsedUrl.searchParams.append(key, this.options.params[key]);
        }
      }
    }
    return {
      url: parsedUrl.href,
      options: {
        ...options,
        headers: {
          ...this.options?.headers,
          ...options.headers,
        },
      },
    };
  }
}
