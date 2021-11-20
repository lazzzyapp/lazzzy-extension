import { BaseRequestOptions } from '@/service/common/request/base';

export interface IPostRequestOptions extends BaseRequestOptions {
  method: 'post';
  requestType: 'json';
  data: any;
}
