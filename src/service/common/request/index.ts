/* eslint-disable no-unused-vars */
import { Token } from 'typedi';
import { IPostRequestOptions } from './post';
import { IPostFormRequestOptions } from './post/form';
import { IGetFormRequestOptions } from './get/form';
import { IPutRequestOptions } from './put';
import { IRequestService } from './service';
import { RequestInterceptor } from './interceptor';
export type Method = 'get' | 'post' | 'put';

export interface IExtendRequestHelper {
  post: <T>(
    url: string,
    options: Omit<IPostRequestOptions, 'method' | 'requestType'>
  ) => Promise<T>;
  postForm: <T>(
    url: string,
    options: Omit<IPostFormRequestOptions, 'method' | 'requestType'>
  ) => Promise<T>;

  put: <T>(url: string, options: Omit<IPutRequestOptions, 'method'>) => Promise<T>;

  get: <T>(url: string, options?: Omit<IGetFormRequestOptions, 'method'>) => Promise<T>;
}

export interface IHelperOptions {
  baseURL?: string;
  headers?: Record<string, string>;
  request: IRequestService;
  params?: Record<string, string>;
  interceptors?: {
    request?: RequestInterceptor[] | RequestInterceptor;
  };
}

export const IBasicRequestService = new Token<IRequestService>();
