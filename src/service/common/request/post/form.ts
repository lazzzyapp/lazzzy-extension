import { BaseRequestOptions } from '@/service/common/request/base';

export interface IPostFormRequestOptions extends BaseRequestOptions {
  method: 'post';
  requestType: 'form';
  data: FormData;
}
